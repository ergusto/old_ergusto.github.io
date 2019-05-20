import React, { useState, useRef } from 'react';
import Velocity from 'velocity-animate';
import { Redirect } from 'react-router-dom';

import './styles.scss';

export default function introduction() {
	const [shouldRedirect, setShouldRedirect] = useState(false);

	const f = useRef(null),
		u = useRef(null),
		s = useRef(null),
		r = useRef(null),
		n = useRef(null),
		wrapper = useRef(null),
		title = useRef(null),
		space = useRef(null),
		button = useRef(null),
		intro = useRef(null),
		myNameIs = useRef(null);

	const animate = event => {
		event && event.preventDefault();

		Velocity(button.current, { opacity: 0 });
		Velocity(button.current, { display: 'none' });

		setTimeout(() => {
			Velocity(intro.current, { opacity: 1 }, { duration: 600 });

			setTimeout(() => {
				Velocity(myNameIs.current, { opacity: 1 }, { duration: 600 });

				setTimeout(() => {
					Velocity(f.current, { color: '#000' });

					setTimeout(() => {
						Velocity(s.current, { color: '#000' });

						setTimeout(() => {
							Velocity(r.current, { color: '#000' });

							setTimeout(() => {
								Velocity(n.current, { color: '#000' });

								setTimeout(() => {
									Velocity(f.current, { opacity: 0 });
									Velocity(s.current, { opacity: 0 });
									Velocity(r.current, { opacity: 0 });
									Velocity(n.current, { opacity: 0 });

									setTimeout(() => {
										Velocity(f.current, { width: '0px' });
										Velocity(u.current, { width: '0px' });
										Velocity(s.current, { width: '0px' });
										Velocity(space.current, { width: '0px' });
										Velocity(r.current, { width: '0px' });
										Velocity(n.current, { width: '0px' });

										setTimeout(() => {
											Velocity(intro.current, { opacity: 0 });

											setTimeout(() => {
												Velocity(title.current, { opacity: 0 });
												Velocity(wrapper.current, { opacity: 0 }, { duration: 1200 });

												setTimeout(() => {
													setShouldRedirect(true);
												}, 600);
											}, 1200);
										}, 1000);
									}, 400);
								}, 400);
							}, 400);
						}, 400);
					}, 400);
				}, 1000);
			}, 1000);
		}, 1000);
	};

	if(shouldRedirect) {
		return <Redirect to="/comments" />;
	}

	return (
		<div ref={wrapper} className='page full-height background-color-dark-blue justify-centre color-white'>
			<div className='text-align-center font-family-comfortaa'>
				<p ref={intro} className='margin-bottom transparent'>Hi, <span className='transparent' ref={myNameIs}>my name is</span></p>
				<h1 ref={title} className='site-title margin-bottom-medium'><span ref={f}>f</span><span>erg</span><span ref={u}>u</span><span ref={s}>s</span><span className='transparent' ref={space}>&nbsp;</span><span ref={r}>r</span><span>usto</span><span ref={n}>n</span></h1>
				<div className="introduction-start-container text-align-center">
					<button ref={button} onClick={animate} className='introduction-start-button button button--fade button--ghost'>Start</button>
				</div>
			</div>
		</div>
	);

}