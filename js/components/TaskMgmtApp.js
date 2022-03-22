import React from "react"
import "./TaskMgmtApp.styl"

import ScreenshotView from "./ScreenshotView"
import CodeSample from "./CodeSample"

import taskMgmtAgendaScreenshot from "url:../../statics/images/task_mgmt_agenda_screenshot.png"
import taskMgmtScheduleScreenshot from "url:../../statics/images/task_mgmt_schedule_screenshot.png"

export default function TaskMgmtApp() {
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

			<div className="screenshots">
				<ScreenshotView src={taskMgmtAgendaScreenshot} caption="Agenda view" />

				<ScreenshotView
					src={taskMgmtScheduleScreenshot}
					caption="Scheduling view"
				/>
			</div>

			<h3>Code Snippets</h3>
			<CodeSample
				title="Timer Function"
				description="A function to run every second and record progress for a task in progress."
			>
				<pre>
					<code>{`timer = () => {
		// Updates the current time in state and entry in progress if necessary
		const currentTime = moment().toDate()
		let newStateObj = { currentTime }

		// Save state data to local storage every minute
		let { secsToSave } = this.state
		if (!secsToSave || secsToSave <= 0) {
			this.saveStateToLocalStorage()
			secsToSave = 60
		}
		newStateObj.secsToSave = secsToSave - 1

		// Do some checks and updates if the timer is running
		const { timeEntries, entryInProgress } = this.state
		const timerRunning = Object.keys(entryInProgress).length > 0

		if (timerRunning) {
			//check to see if the entryInProgress has passed midnight by comparing currentTime with start of entryInProgress
			if (
				moment(currentTime).format("YYYY-MM-DD") !==
				moment(entryInProgress.originalEntry.start).format("YYYY-MM-DD")
			) {
				let midnight = moment(moment(currentTime).format("YYYY-MM-DD")).toDate()
				let { id, taskID, start } = entryInProgress.originalEntry

				//create a new entry with the start as entryInProgress.originalEntry.start and end as midnight
				this.endActiveEntry(id, taskID, start, midnight, false)

				//add an new actual entry in progress starting at midnight
				this.addTimeEntry(taskID, midnight, null, false)
			} else {
				//if the time in entry in progress has not passed midnight, just update the entry in progress
				let updates = updateActiveEntryHelper(
					entryInProgress.originalEntry.taskID,
					entryInProgress.originalEntry.start,
					this.state.tasks
				)
				updates.originalEntry = this.state.entryInProgress.originalEntry
				newStateObj.entryInProgress = updates
			}
		}

		this.setState(newStateObj)
	}`}</code>
				</pre>
			</CodeSample>

			<CodeSample
				title="Time Calculations"
				description="Functions to calculate the length of time between two timestamps and convert numbers of seconds into numbers of hours and minutes."
			>
				<pre>
					<code>{`import moment from "moment"

const timeCalculations = {
	//takes a time duration in seconds and converts to hours, minutes, and number of hours in decimal value
	formatTime: function (durationInSeconds) {
		let hours, min, seconds, decimalHrs
		const round = durationInSeconds >= 0 ? Math.floor : Math.ceil
		hours = round(durationInSeconds / 3600)
		min = round(durationInSeconds / 60 - hours * 60)
		seconds = durationInSeconds - hours * 3600 - min * 60
		decimalHrs = (durationInSeconds / 3600).toFixed(2)

		return {
			hours: Math.abs(hours),
			min: Math.abs(min).toString().padStart(2, "0"),
			seconds: Math.abs(seconds).toString().padStart(2, "0"),
			decimalHrs: decimalHrs,
		}
	},

	//Calculate the number of days from now to a certain date
	formatDaysTill: function (taskDueDate) {
		const daysTillDue = moment({ hours: 0 }).diff(moment(taskDueDate), "days")
		let daysTillString
		let formattedDate = moment(taskDueDate).format("MMM D")

		if (daysTillDue === 0) {
			daysTillString = formattedDate + " (today)"
		} else if (daysTillDue === 1) {
			daysTillString = formattedDate + " (yesterday)"
		} else if (daysTillDue === -1) {
			daysTillString = formattedDate + " (tomorrow)"
		} else if (daysTillDue > 1) {
			daysTillString = formattedDate + " (" + daysTillDue + " days ago)"
		} else if (daysTillDue < -1) {
			daysTillString =
				formattedDate + " (in " + Math.abs(daysTillDue) + " days)"
		} else if (taskDueDate === null) {
			daysTillString = "(none)"
		}

		return {
			string: daysTillString,
			number: daysTillDue,
		}
	},

	//creates a string with info about at task's priority
	formatPriorityTdTitle: function (task) {
		const { dueDate, prioritizedAt, priority } = task
		let { deadline } = task

		let tdTitle = ""
		let priorityStr = ""

		if (deadline === true) {
			deadline = "deadline"
		} else {
			deadline = "target date"
		}

		if (priority === 0) {
			priorityStr = "not prioritized"
		} else if (priority === 1) {
			priorityStr =
				"marked high priority on " + moment(prioritizedAt).format("MMM D")
		} else {
			priorityStr = "prioritized on " + moment(prioritizedAt).format("MMM D")
		}

		if (dueDate === null) {
			tdTitle = "No " + deadline + " specified; " + priority
		} else {
			tdTitle =
				deadline.charAt(0).toUpperCase() +
				deadline.slice(1) +
				" on " +
				moment(dueDate).format("MMM D") +
				"; " +
				priorityStr
		}

		return tdTitle
	},

	//calculate a time of day with number of seconds from midnight
	findTimeFromSeconds: function (seconds) {
		let hours = Math.floor(seconds / 3600)
		let min = Math.floor((seconds % 3600) / 60)
		let secs = Math.ceil(seconds - 3600 * hours - 60 * min)

		let hrsPadded = hours.toString().padStart(2, "0")
		let minPadded = min.toString().padStart(2, "0")
		let secsPadded = secs.toString().padStart(2, "0")

		let armyTime = hrsPadded + ":" + minPadded + ":" + secsPadded

		let meridian = "AM"
		if (hours === 12) {
			meridian = "PM"
		}

		if (hours > 12 && hours < 24) {
			hours -= 12
			meridian = "PM"
		}

		if (hours === 24 || hours === 0) {
			hours = 12
		}

		return {
			meridianTime: hours + ":" + min + " " + meridian,
			armyTime: armyTime,
		}
	},
}

module.exports = timeCalculations
`}</code>
				</pre>
			</CodeSample>
		</div>
	)
}
