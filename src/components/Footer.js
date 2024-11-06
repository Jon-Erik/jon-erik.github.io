import React, { useEffect } from "react"
import { connect } from 'react-redux'

import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

import { wixData as wixDataState } from "../state"

import "./Footer.styl"

const { fetchFooterData } = wixDataState

function Footer({
    footerData,
    footerDataLoading,
    footerDataError,
    onFetchFooterData
}) {
    const {linkedinLink, githubLink} = footerData

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
            <a href={linkedinLink} target="_blank"><LinkedInIcon/></a>
        </div>
        <div className="footer-item">
            <a href={githubLink} target="_blank"><GitHubIcon/></a>
        </div>
    </div>
}

const mapState = state => {
    return {
        footerData: state.wixData.footerData,
        footerDataLoading: state.wixData.footerDataLoading,
        footerDataError: state.wixData.footerDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchFooterData: () => dispatch(fetchFooterData())
})

export default connect(mapState, mapDispatch)(Footer);