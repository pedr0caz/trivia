import React from "react";
import Logo from "./Logo";
export default function Faq() {
	return (
		<section>
			<Logo />
			<main className="faq">
				<div className="faq_holder">
					<h1 className="faq_heading">F.A.Q.</h1>
					<details className="faq_detail">
						<summary className="faq_summary">
							<span className="faq_question">
								There is any paid content on the game?
							</span>
						</summary>
						<p className="faq_text">
							No ! Theres no ads or any paid content/subscrition on our game!
						</p>
					</details>
					<details className="faq_detail">
						<summary className="faq_summary">
							<span className="faq_question">
								Why do i need to register to play the game?
							</span>
						</summary>
						<p className="faq_text">
							So we can keep your score points for our ranking system!
						</p>
					</details>
					<details className="faq_detail">
						<summary className="faq_summary">
							<span className="faq_question">How do I reset my password?</span>
						</summary>
						<p className="faq_text">
							Click “Forgot password” from the login page or “Change password”
							from your profile page.
						</p>
						<p className="faq_text">A reset link will be emailed to you.</p>
					</details>

					<details className="faq_detail">
						<summary className="faq_summary">
							<span className="faq_question">
								Do you provide additional support?
							</span>
						</summary>
						<p className="faq_text">
							Our contact form or email support is available 24/7.
						</p>
					</details>
				</div>
			</main>
		</section>
	);
}
