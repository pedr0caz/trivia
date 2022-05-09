import React from "react";
import Logo from "./Logo";
export default function Faq() {
	return (
		<section>
			<Logo />
			<main class="faq">
				<div class="faq_holder">
					<h1 class="faq_heading">F.A.Q.</h1>
					<details class="faq_detail">
						<summary class="faq_summary">
							<span class="faq_question">
								There is any paid content on the game?
							</span>
						</summary>
						<p class="faq_text">
							No ! Theres no ads or any paid content/subscrition on our game! 
						</p>
					</details>
					<details class="faq_detail">
						<summary class="faq_summary">
							<span class="faq_question">
								Why do i need to register to play the game?
							</span>
						</summary>
						<p class="faq_text">
							So we can keep your score points for our ranking system! 
						</p>
					</details>
					<details class="faq_detail">
						<summary class="faq_summary">
							<span class="faq_question">How do I reset my password?</span>
						</summary>
						<p class="faq_text">
							Click “Forgot password” from the login page or “Change password”
							from your profile page.
						</p>
						<p class="faq_text">A reset link will be emailed to you.</p>
					</details>
					
					<details class="faq_detail">
						<summary class="faq_summary">
							<span class="faq_question">
								Do you provide additional support?
							</span>
						</summary>
						<p class="faq_text">
							Our contact form or email support is available 24/7. 
						</p>
					</details>
				</div>
			</main>
		</section>
	);
}
