import React, { useEffect } from "react"
import "./PowerToolRepair.styl"

import ScreenshotView from "./ScreenshotView"
import CodeSample from "./CodeSample"

import ptrEcomHomepage from "url:../../statics/images/ptr-screenshots/ecom-homepage.png"
import ptrEcomToolDetails from "url:../../statics/images/ptr-screenshots/ecom-tool-details.png"
import ptrInternalImgCapture from "url:../../statics/images/ptr-screenshots/internal-img-capture.png"
import ptrInternalInvoiceDetails from "url:../../statics/images/ptr-screenshots/internal-invoice-details.png"
import ptrInternalLineDrawing from "url:../../statics/images/ptr-screenshots/internal-line-drawing.png"
import ptrInternalNewCustomer from "url:../../statics/images/ptr-screenshots/internal-new-customer.png"
import ptrInternalPicking from "url:../../statics/images/ptr-screenshots/internal-picking.png"
import ptrInternalReports from "url:../../statics/images/ptr-screenshots/internal-reports.png"
import ptrInternalShippingModal from "url:../../statics/images/ptr-screenshots/internal-shipping-modal.png"

export default function PowerToolRepair() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className="PowerToolRepair">
			<h1>Power Tool Repair Ohio</h1>
			<h2>Commercial application in Node.js, React.js, and Next.js</h2>
			<ul>
				<li>
					Developed on a team with{" "}
					<a href="https://icomputeconsulting.com/">iCompute Consulting</a>, a
					small web development firm in Northeast Ohio
				</li>
				<li>
					Visit ecommerce site{" "}
					<a rel="noreferrer" target="_blank" href="https://ptrohio.com">
						here
					</a>
				</li>
				<li>
					Collaborated on the design and implementation of a full stack
					commercial application with relational database back end, internal
					business application, and public-facing online store
				</li>
				<li>
					Worked closely with client’s needs and specifications to streamline
					their sales and service workflow through custom-designed software
				</li>
				<li>
					Helped integrate third-party services for payments (Stripe),
					commercial shipping (Easypost), and ecommerce web traffic analysis
					(Google Analytics)
				</li>
				<li>Set up business analytics through Grafana dashboard</li>
			</ul>

			<h3>Screenshots</h3>
			<div className="screenshots">
				<ScreenshotView src={ptrEcomHomepage} caption="Ecommerce homepage" />

				<ScreenshotView
					src={ptrEcomToolDetails}
					caption="Ecommerce product details"
				/>

				<ScreenshotView
					src={ptrInternalImgCapture}
					caption="Internal application image capture via webcam"
				/>

				<ScreenshotView
					src={ptrInternalInvoiceDetails}
					caption="Internal application invoice details"
				/>

				<ScreenshotView
					src={ptrInternalLineDrawing}
					caption="Internal application technical line drawing"
				/>

				<ScreenshotView
					src={ptrInternalNewCustomer}
					caption="Internal application new customer form"
				/>

				<ScreenshotView
					src={ptrInternalPicking}
					caption="Internal application inventory picking screen"
				/>

				<ScreenshotView
					src={ptrInternalReports}
					caption="Internal application sales report"
				/>

				<ScreenshotView
					src={ptrInternalShippingModal}
					caption="Internal application shipping modal"
				/>
			</div>

			<h3>Code Snippets</h3>
			<CodeSample
				title="Internal Application Autosave Store"
				description="A react store component which uses the react-easy-state library to save and load data as needed."
			>
				<pre>
					<code>{`import { store as resStore } from "@risingstack/react-easy-state"
import { showAlert } from "../../lib/utils"
import api from "../../lib/api"
import objectPath from "object-path"

export default function createAutosaveStore({
	load,
	storeProps,
	pollInterval = 15 * 1000,
	reloadAfterSave = false,
}) {
	let loadTimer = null
	let stopped = false
	let newRecordIDCounter = -1

	const store = resStore({
		// Store props are update functions and any other props
		// needed for the specific store
		...storeProps,
		// NB: Update functions should
		// immediately apply changes to the store, and then call
		// addToPendingUpdates with a new update object as argument

		// Loading status variables
		loading: false,
		firstLoadComplete: false,
		loadError: null,

		// Stops loading and saving when the table info is not displayed
		stop() {
			if (!stopped) {
				stopped = true
				clearTimeout(loadTimer)
			}
		},

		// Restarts loading and saving the table info
		start() {
			if (stopped) {
				stopped = false
				store.load()
				setTimeout(store.load, pollInterval)
			}
		},

		// Gets a temporary negative integer ID for new items that
		// are created in the store. Returns the current counter and
		// decrements it
		getTempID() {
			const newID = newRecordIDCounter
			newRecordIDCounter--
			return newID
		},

		// Loads data from the server and saves it to the store.
		// - Called at the specified pollInterval in order to keep the
		// page in sync with the server data.
		// - Calls save data on complete to account for any changes during the load.
		// - Uses load prop function which saves requested data directly to the store.
		async load() {
			clearTimeout(loadTimer)
			if (stopped) {
				return
			}
			if (store.loading || store.saving) {
				loadTimer = setTimeout(store.load, pollInterval)
				return
			}
			store.loading = true
			store.loadError = null

			try {
				const data = await load()
				// Abort load operation if updates are pending; do not clobber store
				if (!store.updatesPending && typeof data === "object") {
					Object.assign(store, data)
				}
			} catch (e) {
				console.error("store: load error", e)
				store.loadError = e
			} finally {
				store.firstLoadComplete = true
				store.loading = false
				// Check if save is necessary
				store.save()
			}
		},

		// Saving status variables
		saving: false,
		saveError: null,
		firstSaveComplete: false,
		get saveSuccessful() {
			return store.firstSaveComplete && !store.saveError
		},

		// Returns "true" if and only if updates are pending.
		// "load" functions should check this right before updating the store,
		// especially after any asynchronous request
		get updatesPending() {
			return store.pendingUpdates.length > 0
		},

		pendingUpdates: [],
		/* Pending updates is an array of objects in this format:
			{
				method: "updateItem", "createItem", or "deleteItem"
				customPath: custom path for requests not included in api functions
				collection: "collectionName",
				storeKey: Allows the new ID of newly created items to be automatically
					set where the tempID is being used before the new record was created.
					--> if the path of the tempID in each item of the store
							array field is "id":
								storeKey: "storeKeyName"
					--> if the path of the tempID in each item of the store
							array field is NOT "id":
								storeKey: { field: "storeKeyName", path: "path.to.id.in.array.item.object"}
				id: primary key of record in the database,
				reqBody: {
					(data to update or create with in key-value pairs)
				}
			}

			Required keys:
			- Either a customPath or method must be provided. In the case of a customPath, the
				generic API methods (patch, del, post) should be used
			- If a method is "updateItem" or "deleteItem", collectionName and id must be provided
			- If the method is "updateItem" or "createItem", reqBody must be provided
			- If the method is "createItem", storeKey and collectionName must be provided
		*/

		addToPendingUpdates(item) {
			const { method, collection, id, customPath, reqBody } = item

			if (method === "createItem") {
				// If an item is being created, push it to the pending updates
				store.pendingUpdates.push(item)
			} else if (method === "deleteItem") {
				// If deleting an item, delete any other updates with the same ID
				// and collection
				store.pendingUpdates = store.pendingUpdates.filter(
					update => update.id !== id || update.collection !== collection
				)

				if (item.id > 0) {
					// Do not queue to delete item if it has temp ID
					store.pendingUpdates.push(item)
				}
			} else if (method === "updateItem" || customPath) {
				// Look to see if there is a similar item in pending updates
				// with the same id, collection, and method/customPath
				const index = store.pendingUpdates.findIndex(
					update =>
						update.id === id &&
						update.collection === collection &&
						(update.method === method || update.customPath === customPath)
				)

				if (index > -1) {
					// If a similar pending update is found, reassign the new item's
					// reqBody with the new data at the found index.
					Object.assign(store.pendingUpdates[index].reqBody, reqBody)
				} else {
					// If the item is not found, push new item to pending updates
					store.pendingUpdates.push(item)
				}
			} else {
				const err = new Error("No valid API request method provided.")
				showAlert("error", "Method error", err.message)
				throw err
			}

			// Always call save to commit any updates
			store.save()
		},

		async save() {
			clearTimeout(loadTimer)
			if (stopped) {
				return
			}

			if (store.loading || store.saving || store.pendingUpdates.length === 0) {
				loadTimer = setTimeout(store.load, pollInterval)
				return
			}

			store.saving = true
			store.saveError = null

			while (store.pendingUpdates.length > 0) {
				const item = store.pendingUpdates.shift()
				const { method, collection, id, customPath } = item
				let { callback } = item
				const reqBody = Object.assign({}, item.reqBody)

				try {
					if (customPath) {
						// If a custom path was provided, use the method, customPath,
						// and reqBody to create a new request
						await api[method](customPath, reqBody)
					} else {
						// Create an API request based on the update info if the method
						// is a basic update, create, or delete request
						if (method === "updateItem") {
							await api.updateItem(collection, id, reqBody)
						}

						if (method === "createItem") {
							const key =
								item.storeKey && (item.storeKey.field || item.storeKey)
							const path =
								item.storeKey && item.storeKey.path ? item.storeKey.path : "id"

							// Newly created items are given a unique temporary ID of a
							// negative integer which will be in the item's reqBody
							const tempID = reqBody.id || item.id
							delete reqBody.id

							const newItem = await api.createItem(collection, reqBody)

							// Look for the temp ID in store and pending updates and replace
							// with the newly created ID
							store.pendingUpdates.forEach(update => {
								if (update.id === tempID && update.collection === collection) {
									update.id = newItem.id
								}
							})

							// If a store key is provided which is an array, update the ID
							// of the item with the tempID
							if (store[key]) {
								store[key].forEach(storeItem => {
									if (objectPath.get(storeItem, path) === tempID) {
										objectPath.set(storeItem, path, newItem.id)
									}
								})
							}
						}

						if (method === "deleteItem") {
							await api.deleteItem(collection, id)
						}
					}

					if (callback) {
						// Ensure "callback" is not called again if it throws an error
						const cb = callback
						callback = null

						await cb(null)
					}
				} catch (e) {
					console.error("store: save error", e)

					// Note: If "callback" threw the error, "callback" is not called again
					if (callback) {
						await callback(e)
					}

					// Display the error to the client/user
					store.saveError = e

					await showAlert(
						"error",
						"Save Error",
						"There was an error saving changes: " + e.message
					)

					// Return the item to pending updates
					store.pendingUpdates.unshift(item)

					// Try sync again in 5 seconds
					setTimeout(() => {
						store.saving = false
						store.save()
					}, 5000)
					return
				}
			}

			store.firstSaveComplete = true
			store.saving = false
			if (reloadAfterSave) {
				store.load()
			} else {
				store.save()
			}
		},
	})
	return store
}`}</code>
				</pre>
			</CodeSample>

			<CodeSample
				title="Webcam Capture Component"
				description="React component for taking a photo in the browser."
			>
				<pre>
					<code>{`import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { view } from "@risingstack/react-easy-state"
import cn from "classnames"

import "./WebcamCapture.styl"

import Button from "./Button"
import MessageBox from "./MessageBox"
import Modal from "./Modal"
import Spinner from "./Spinner"

function WebcamCapture({ className, mimeType, onCapture, onClose }) {
	const videoRef = useRef()
	const canvas = useRef()

	/* Possible component states:
		 - processing (loading)
		 - error
		 - video: focusing/aiming webcam */
	const [state, setState] = useState("processing")

	const [errMsg, setErrMsg] = useState(null)
	const [imageHeight, setImageHeight] = useState(null)
	const [imageWidth, setImageWidth] = useState(null)

	function capturePicture() {
		setState("processing")
		try {
			if (!imageHeight || !imageWidth) {
				throw new Error("Capture error: No image dimensions")
			}

			// Draw the image from the video stream on hidden canvas element
			// using height and width of video stream
			const ctx = canvas.current.getContext("2d")
			ctx.drawImage(videoRef.current, 0, 0, imageWidth, imageHeight)

			// Create a data URL for the image on the canvas
			const dataURL = canvas.current.toDataURL(mimeType, 1.0)

			onCapture(dataURL)
			onClose()
		} catch (err) {
			setErrMsg(err.message)
			console.error(err)
			setState("error")
		}
	}

	async function startVideoStream() {
		setState("processing")
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: true,
			})

			videoRef.current.srcObject = mediaStream
			const { width, height } = mediaStream.getVideoTracks()[0].getSettings()
			setImageHeight(height)
			setImageWidth(width)

			setErrMsg(null)
			setState("video")
		} catch (err) {
			console.error(err)
			setErrMsg("Webcam Error: " + err.toString())
			setState("error")
		}
	}

	useEffect(() => {
		;(async () => {
			startVideoStream()
		})()
	}, [])

	let title
	switch (state) {
		case "processing":
			title = "Loading"
			break
		case "video":
			title = "Take a Picture"
			break
		default:
			title = "Error!"
	}

	return (
		<Modal
			title={title}
			className={cn("WebcamCapture", className)}
			hideContinueButton
			onResponse={onClose}
		>
			{/* Show any error */}
			<div className={cn(state !== "error" && "hidden")}>
				{errMsg && <MessageBox type="error">{errMsg}</MessageBox>}
				<Button
					className="wide-btn"
					text="Try again"
					onPress={startVideoStream}
					style="destructive"
				/>
			</div>

			{/* Show loading of any kind */}
			<div className={cn(state !== "processing" && "hidden")}>
				<Spinner /> <i>Loading...</i>
			</div>

			{/* Showing video stream to capture picture */}
			<div className={cn(state !== "video" && "hidden")}>
				<video ref={videoRef} height="100%" width="100%" autoPlay />
				<Button
					icon="camera"
					text="Take a picture"
					style="primary"
					className="wide-btn"
					onPress={capturePicture}
				/>
			</div>

			{/* Canvas tag is hidden from user; needed in DOM
					for image capture from media stream */}
			<canvas ref={canvas} height={imageHeight} width={imageWidth} />
		</Modal>
	)
}

WebcamCapture.propTypes = {
	className: PropTypes.string,
	mimeType: PropTypes.string,
	onCapture: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default view(WebcamCapture)
`}</code>
				</pre>
			</CodeSample>

			<CodeSample
				title="Stripe Payment Method"
				description="A react component to display and update a credit card saved through the Stripe payments API."
			>
				<pre>
					<code>{`import React, { useState } from "react"
import { view } from "@risingstack/react-easy-state"
import fecha from "fecha"

import api from "../lib/api.js"

import Button from "./Button"
import Spinner from "./Spinner.js"
import cn from "classnames"

export default view(function StripeMethodRow({
	method,
	selectedMethod,
	processing,
	setProcessing,
	cancelOpenIntents,
	setUpPaymentIntent,
	deletingCard,
	setDeletingCard,
	reloadData,
	handleError,
	preferredMethod,
	disableSelect,
	allowEditing,
	customerID,
}) {
	const { brand, exp_month: expMonth, exp_year: expYear, last4 } = method.card
	const addedOn = fecha.format(new Date(method.created * 1000), "M/D/YY")
	const [editingExpiry, setEditingExpiry] = useState(null)
	const [updatingCard, setUpdatingCard] = useState(false)

	async function updateCard() {
		try {
			setUpdatingCard(true)

			await api.patch("stripe/payment-method/" + method.id + "/" + customerID, {
				card: {
					exp_year: parseInt("20" + editingExpiry.expYear),
					exp_month: editingExpiry.expMonth,
				},
			})

			setEditingExpiry(null)
			reloadData()
		} catch (err) {
			err.message = "There was an error updating the card: " + err.message
			handleError(err)
		} finally {
			setUpdatingCard(false)
		}
	}

	// Brand from stripe is etiher American Express, Diners Club,
	// Discover, JCB, MasterCard, UnionPay, Visa, or Unknown. The
	// switch below assigns a font awesome specific card icon if
	// it is available
	let cardIcon = "stripe"
	let brandName = "Unknown"
	switch (brand.toLowerCase()) {
		case "visa":
			cardIcon = "visa"
			brandName = "Visa"
			break
		case "amex":
			cardIcon = "amex"
			brandName = "American Express"
			break
		case "diners":
			cardIcon = "diners-club"
			brandName = "Diners Club"
			break
		case "jcb":
			cardIcon = "jcb"
			brandName = "JCB"
			break
		case "mastercard":
			cardIcon = "mastercard"
			brandName = "MasterCard"
			break
		case "discover":
			cardIcon = "discover"
			brandName = "Discover"
			break
		case "unionpay":
			brandName = "UnionPay"
	}

	const methodIsSelected =
		selectedMethod && selectedMethod.paymentMethodID === method.id
			? true
			: false

	const minYear = parseInt(new Date().getFullYear().toString().substring(2, 4))
	const maxYear = minYear + 6

	// JS month integer is zero-indexed
	const minMonth =
		editingExpiry && editingExpiry.expYear === minYear
			? new Date().getMonth() + 1
			: 1
	const maxMonth = 12

	function updateExp(data) {
		const dataParsedInt = {}
		Object.keys(data).forEach(key => {
			dataParsedInt[key] = parseInt(data[key])
		})

		setEditingExpiry(Object.assign({}, editingExpiry, dataParsedInt))
	}

	return (
		<tr
			key={method.id}
			title={preferredMethod === method.id ? "Customer preferred method" : ""}
		>
			{/* Show the select checkbox only if setUpPaymentIntent
					is a prop; this means row is displayed in payment modal,
					not customer details payments tab*/}
			{setUpPaymentIntent && (
				<td className="select">
					{processing === method.id ? (
						<Spinner />
					) : (
						<input
							type="checkbox"
							checked={methodIsSelected}
							onChange={async () => {
								setProcessing(method.id)
								if (methodIsSelected) {
									await cancelOpenIntents()
								} else {
									await setUpPaymentIntent(method.id)
								}
								setProcessing(false)
							}}
							disabled={disableSelect}
						/>
					)}
				</td>
			)}
			<td className="type">
				<i className={"fab fa-cc-" + cardIcon}></i> {brandName}
			</td>
			<td className="added">{addedOn}</td>
			<td className={cn("expiry", allowEditing && "withEditing")}>
				{!allowEditing ? (
					<span>
						{expMonth}/{expYear.toString().substring(2, 4)}
					</span>
				) : (
					<React.Fragment>
						{!editingExpiry ? (
							<span className="expNoEdit">
								{expMonth}/{expYear.toString().substring(2, 4)}
							</span>
						) : (
							<form onSubmit={updateCard}>
								<input
									type="number"
									step="1"
									min={minMonth}
									max={maxMonth}
									value={editingExpiry.expMonth}
									onChange={e => updateExp({ expMonth: e.target.value })}
									onBlur={e => {
										const newMonth = e.target.value
										if (newMonth < minMonth) {
											updateExp({ expMonth: minMonth })
										} else if (newMonth > maxMonth) {
											updateExp({ expMonth: maxMonth })
										}
									}}
								/>
								<span className="slash">/</span>
								<input
									type="number"
									step="1"
									min={minYear}
									max={maxYear}
									value={editingExpiry.expYear}
									onChange={e => updateExp({ expYear: e.target.value })}
									onBlur={e => {
										const newYear = e.target.value
										let updateYear = null
										if (newYear < minYear) {
											updateYear = minYear
										} else if (newYear > maxYear) {
											updateYear = maxYear
										}

										if (updateYear) {
											const newMinMonth =
												updateYear && updateYear === minYear
													? new Date().getMonth() + 1 // current month
													: 1

											const updateMonth =
												updateYear === minYear &&
												editingExpiry.expMonth < newMinMonth
													? newMinMonth
													: editingExpiry.expMonth

											updateExp({
												expMonth: updateMonth,
												expYear: updateYear,
											})
										}
									}}
								/>
							</form>
						)}
					</React.Fragment>
				)}
			</td>
			<td className="num">
				**** **** **** {last4}
				{preferredMethod === method.id && (
					<span className="preferred-method">
						<i className="fas fa-check-circle"></i>
					</span>
				)}
			</td>
			<td className={cn("actions", allowEditing && "withEditing")}>
				{!editingExpiry ? (
					<React.Fragment>
						{allowEditing && (
							<Button
								style="primary"
								onPress={() =>
									setEditingExpiry({
										expMonth: parseInt(expMonth),
										expYear: parseInt(expYear.toString().substring(2, 4)),
									})
								}
								title="Edit expiry date"
								icon="edit"
								size="small"
							>
								Edit
							</Button>
						)}
						<Button
							icon="times"
							style="destructive"
							size="small"
							loading={method.id === deletingCard}
							disabled={!!processing}
							title="Remove payment method"
							confirmMessage={() => (
								<p>
									Are you sure you want to delete the card ending in{" "}
									<strong>{last4}</strong>?
								</p>
							)}
							onPress={async () => {
								setDeletingCard(true)
								try {
									await api.del(
										"stripe/payment-method/" + method.id + "/" + customerID
									)
									reloadData()
								} catch (err) {
									handleError({
										error: err,
										title: "Error deleting payment method",
										message: "There was an error deleting the payment method",
									})
								} finally {
									setDeletingCard(false)
								}
							}}
						/>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Button
							style="primary"
							onPress={updateCard}
							loading={updatingCard}
							icon={updatingCard ? "" : "save"}
							title="Save"
							size="small"
							disabled={!editingExpiry.expMonth || !editingExpiry.expYear}
						/>
						<Button
							disabled={updatingCard || deletingCard}
							style="destructive"
							onPress={() => setEditingExpiry(null)}
							icon="ban"
							size="small"
							title="Cancel"
						/>
					</React.Fragment>
				)}
			</td>
		</tr>
	)
})
`}</code>
				</pre>
			</CodeSample>
		</div>
	)
}
