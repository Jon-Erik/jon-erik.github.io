import React, { useEffect } from "react"
import "./TaskMgmtApp.styl"

import ScreenshotView from "./ScreenshotView"
import CodeSample from "./CodeSample"
import Carousel from "./Carousel"

import taskMgmtAgenda from "url:../../statics/images/task-mgmt-screenshots/agenda.png"
import taskMgmtSchedule from "url:../../statics/images/task-mgmt-screenshots/schedule.png"

import taskMgmtTimerFunction from "url:../../statics/docs/task-mgmt-timer-function.txt"
import taskMgmtTimeCalculations from "url:../../statics/docs/task-mgmt-time-calculations.txt"

export default function TaskMgmtApp() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className="TaskMgmtApp">
			<h1>Task Management Application</h1>
			<h2>Web application for scheduling, time keeping, and billing</h2>
			<ul>
				<li>
					Developed on a team with{" "}
					<a href="https://icomputeconsulting.com/">iCompute Consulting</a>, a
					small web development firm in Northeast Ohio
				</li>
				<li>
					Helped determine logic and design layout of front-end only web
					application in React.js
				</li>
				<li>
					Worked closely with lead developer to incorporate specific features
					and functionality
				</li>
			</ul>

			<h3>Screenshots</h3>
			<Carousel>
				<ScreenshotView src={taskMgmtAgenda} caption="Agenda view" />
				<ScreenshotView src={taskMgmtSchedule} caption="Scheduling view" />
			</Carousel>

			<h3>Code Snippets</h3>
			<CodeSample
				title="Timer Function (JavaScript)"
				description="A function to run every second and record progress for a task in progress."
				codeTxtFile={taskMgmtTimerFunction}
			/>

			<CodeSample
				title="Time Calculations (JavaScript and moment.js Javascript library)"
				description="Functions to calculate the length of time between two timestamps and convert numbers of seconds into numbers of hours and minutes."
				codeTxtFile={taskMgmtTimeCalculations}
			/>
		</div>
	)
}
