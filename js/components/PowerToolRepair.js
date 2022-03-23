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

import ptrAutosaveStore from "url:../../statics/docs/ptr-autosave-store.txt"
import ptrWebcamCapture from "url:../../statics/docs/ptr-webcam-capture.txt"
import ptrStripePaymentMethod from "url:../../statics/docs/ptr-stripe-payment-method.txt"

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
				title="Internal Application Autosave Store (React.js component with react-easy-state library)"
				description="A react store component which uses the react-easy-state library to save and load data as needed."
				codeTxtFile={ptrAutosaveStore}
			/>

			<CodeSample
				title="Webcam Capture Component (React.js component)"
				description="A component for taking a photo in the browser."
				codeTxtFile={ptrWebcamCapture}
			/>

			<CodeSample
				title="Stripe Payment Method (React.js component)"
				description="A component to display and update a credit card saved through the Stripe payments API."
				codeTxtFile={ptrStripePaymentMethod}
			/>
		</div>
	)
}
