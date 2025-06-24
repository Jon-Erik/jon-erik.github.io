import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import { asHTML } from '../services/prismic'
import { req } from '../services/fetch'
import { fetchContactData } from '../state/externalData'

import PageContentWrapper from '../components/PageContentWrapper'
import Header from '../components/Header'
import ParagraphText from '../components/ParagraphText'
import ButtonLink from '../components/ButtonLink'
import Button from '../components/Button'

import './Contact.styl'

const {
  REACT_APP_RECAPTCHA_SITE_KEY,
  REACT_APP_BACKEND_API_URL,
  REACT_APP_BACKEND_API_KEY
} = process.env

const defaultFormData = {
  firstName: {
    label: 'First Name',
    value: '',
    error: '',
    type: 'text',
    maxLength: 50
  },
  lastName: {
    label: 'Last Name',
    value: '',
    error: '',
    type: 'text',
    maxLength: 50
  },
  email: {
    label: 'Email Address',
    value: '',
    error: '',
    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    type: 'text',
    maxLength: 50
  },
  message: {
    label: 'Message',
    value: '',
    error: '',
    type: 'textarea',
    maxLength: 1500,
    minLength: 20,
    className: 'full-width'
  }
}

const statuses = {
  NOT_SUBMITTED: 0,
  LOADING: 1,
  ERROR: 2,
  SUCCESS: 3
}

function Contact({
  navbarData,
  navbarDataLoading,
  contactData,
  contactDataLoading,
  contactDataError,
  onFetchContactData
}) {
  const [formData, setFormData] = useState(defaultFormData)
  const formErrs = formData
    ? Object.keys(formData)
        .map((key) => {
          return formData[key].value && !formData[key].error
        })
        .filter((v) => v == false).length > 0
    : false
  const [submitStatus, setSubmitStatus] = useState({
    code: statuses.NOT_SUBMITTED,
    msg: ''
  })

  const main_header_html = asHTML(contactData && contactData.main_header)
  const description_html = asHTML(contactData && contactData.description)
  const error_text_html = asHTML(contactData && contactData.error_text)
  const success_text_html = asHTML(contactData && contactData.success_text)

  const { pathname } = useLocation()
  const links = navbarData.filter((d) => !d.route.startsWith(pathname))
  const loading = navbarDataLoading || contactDataLoading

  const submitting = submitStatus.code == statuses.LOADING

  function updateFormData(fieldName, e) {
    const newVal = e.target.value
    const formDataCopy = Object.assign({}, formData)

    const { maxLength } = formDataCopy[fieldName]

    formDataCopy[fieldName].value = newVal.slice(0, maxLength)
    setFormData(formDataCopy)
  }

  function validateField(fieldName) {
    const formDataCopy = Object.assign({}, formData)
    const { value, label, regex, minLength } = formDataCopy[fieldName]

    let newError = ''
    if (!value) {
      newError = `${label} is required.`
    }

    if (!newError && regex) {
      const exp = new RegExp(regex)
      if (!exp.test(value)) {
        newError = `${label} is in an invalid format.`
      }
    }

    if (!newError && minLength && value.length < minLength) {
      newError = `${label} should be at least ${minLength} characters.`
    }

    formDataCopy[fieldName].error = newError
    setFormData(formDataCopy)
  }

  async function submitForm(e) {
    e.preventDefault()
    //console.log("Submitting form", formData)
    if (formErrs) {
      return
    }

    try {
      setSubmitStatus({
        code: statuses.LOADING
      })

      grecaptcha.ready(function () {
        grecaptcha
          .execute(REACT_APP_RECAPTCHA_SITE_KEY, { action: 'submit' })
          .then(async function (captchaToken) {
            //console.log({captchaToken})

            const submitData = {}
            Object.keys(formData).forEach((key) => {
              submitData[key] = formData[key].value
            })

            const { success, msg } = await req({
              url: REACT_APP_BACKEND_API_URL,
              method: 'POST',
              body: {
                captchaToken,
                formData: submitData,
                apiKey: REACT_APP_BACKEND_API_KEY
              }
            })

            if (success) {
              setSubmitStatus({
                code: statuses.SUCCESS
              })
            } else {
              setSubmitStatus({
                code: statuses.ERROR,
                msg
              })
            }
          })
      })
    } catch (error) {
      setSubmitStatus({
        code: statuses.ERROR,
        msg: `An error occurred: ${error.message}`
      })
    }
  }

  useEffect(() => {
    onFetchContactData()

    const recaptchaScriptTag = document.querySelector('#recaptcha')
    if (!recaptchaScriptTag) {
      const scriptTag = document.createElement('script')
      scriptTag.id = 'recaptcha'
      scriptTag.src = `https://www.google.com/recaptcha/api.js?render=${REACT_APP_RECAPTCHA_SITE_KEY}`
      document.head.appendChild(scriptTag)
    }

    return () => {
      document.querySelector('#recaptcha').remove()
      document.querySelector('.rc-anchor') &&
        document.querySelector('.rc-anchor').remove()
    }
  }, [])

  return (
    <PageContentWrapper loading={loading} centerChildren={true}>
      <div className="contact">
        <Header html={main_header_html} errMsg={contactDataError} />
        <ParagraphText html={description_html} />

        {[statuses.ERROR, statuses.NOT_SUBMITTED, statuses.LOADING].includes(
          submitStatus.code
        ) && (
          <form>
            {Object.keys(defaultFormData).map((fieldName) => {
              const { type, value, error, label, className } =
                defaultFormData[fieldName]
              return (
                <div key={fieldName} className={`form-input ${className}`}>
                  <label htmlFor={fieldName}>
                    {label}
                    <span className="required">*</span>
                  </label>
                  {error && <span className="error">{error}</span>}
                  <br />
                  {type == 'text' && (
                    <input
                      type="text"
                      className="text-input"
                      id={fieldName}
                      onBlur={() => validateField(fieldName)}
                      onChange={(e) => updateFormData(fieldName, e)}
                      value={value}
                    />
                  )}
                  {type == 'textarea' && (
                    <textarea
                      type="text"
                      rows="8"
                      className="text-input"
                      id={fieldName}
                      onBlur={() => validateField(fieldName)}
                      onChange={(e) => updateFormData(fieldName, e)}
                      value={value}
                    ></textarea>
                  )}
                </div>
              )
            })}

            {submitStatus.code == statuses.ERROR && (
              <div className="error-status">
                <ParagraphText html={error_text_html} />
                <p>Error: {submitStatus.msg}</p>
              </div>
            )}

            <Button
              text="Submit"
              onClick={submitForm}
              isNavLink={false}
              disabled={formErrs || submitting}
              loading={submitStatus.code == statuses.LOADING}
              disclaimerHTML={`<span>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a>
								and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</span>`}
            />
          </form>
        )}

        {submitStatus.code == statuses.SUCCESS && (
          <div className="success-status">
            <ParagraphText html={success_text_html} />
          </div>
        )}

        <div className="links">
          {links.map((d) => (
            <ButtonLink
              key={d.route}
              route={d.route}
              text={`View ${d.title}`}
            />
          ))}
        </div>
      </div>
    </PageContentWrapper>
  )
}

const mapState = (state) => {
  return {
    navbarData: state.externalData.navbarData,
    navbarDataLoading: state.externalData.navbarDataLoading,
    contactData: state.externalData.contactData,
    contactDataLoading: state.externalData.contactDataLoading,
    contactDataError: state.externalData.contactDataError
  }
}

const mapDispatch = (dispatch) => ({
  onFetchContactData: () => dispatch(fetchContactData())
})

export default connect(mapState, mapDispatch)(Contact)
