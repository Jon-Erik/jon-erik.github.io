import React from "react";
import "./Profile.styl";

import portraitImg from "url:../../statics/images/Jon-Erik_Chandler_profile_picture_2_square-cropped.jpg"
import resumePDF from "url:../../statics/docs/Jon-Erik_Chandler_Developer_Resume.pdf"

export default function Profile() {
	return <div className="Profile" id="profile">
		<div className="image">
			<img src={portraitImg}/>
		</div>
		<div className="bio">
			<p>Currently seeking in-person, remote, or hybrid position in web development. Resume available <a href={resumePDF} rel="noreferrer" target="_blank">here</a>.</p>

			<p>Developer with more than 3 years’ experience in various front- and back-end technologies, with an emphasis on React.js and Node.js. Can work reliably independently or in a collaborative environment, either in-person or remote. Excels in learning new skills and technologies and enjoys designing smooth digital experiences for others.</p>

			<p>Has experience working with the following technologies: HTML5, CSS3, Stylus, React.js, Next.js, Node.js, Koa.js, Git, MySQL, Sequelize, REST APIs, PugJS, Easypost, Google Analytics, Stripe, MailChimp, Grafana</p>

			<p>Holds master&apos;s level education in music; unique transferable experiences as musician include: working on a team, focus, determination, perseverance, memorization, and the ability to work under pressure. Also holds citizenship in both Canada and the United States.</p>
		</div>
	</div>;
}
