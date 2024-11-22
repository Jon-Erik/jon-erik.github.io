import React, { useEffect } from "react"
import { connect } from 'react-redux'

import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

import { externalData as externalDataState } from "../state"

import "./Footer.styl"

const { fetchFooterData } = externalDataState

function Footer({
    footerData,
    footerDataLoading,
    footerDataError,
    onFetchFooterData
}) {
    const {linkedin_link, github_link} = footerData
    console.log({footerData})

    useEffect(() => {
        if (!Object.keys(footerData).length) {
            onFetchFooterData()
        }
    }, [])

    return <div className="footer">
        <div className="footer-item copyright">
            Website © {new Date().getFullYear()} Jon-Erik Chandler
        </div>
        <div className="footer-item">
            <a href={linkedin_link && linkedin_link.url} target="_blank"><LinkedInIcon/></a>
        </div>
        <div className="footer-item">
            <a href={github_link && github_link.url} target="_blank"><GitHubIcon/></a>
        </div>
    </div>
}

const mapState = state => {
    return {
        footerData: state.externalData.footerData,
        footerDataLoading: state.externalData.footerDataLoading,
        footerDataError: state.externalData.footerDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchFooterData: () => dispatch(fetchFooterData())
})

export default connect(mapState, mapDispatch)(Footer);