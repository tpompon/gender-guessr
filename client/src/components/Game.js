import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Button from './Button'

const Game = () => {
	
	const [loaded, setLoaded]		= useState(false)
	const [status, setStatus]		= useState(null)
	const [points, setPoints]		= useState(10)
	const [firstname, setFirstname]	= useState({
		value: null,
		gender: null
	})

	useEffect(() => {

	}, [status])

	useEffect(() => {
		if (points === 20)
			setStatus('win')
		else if (points === 0)
			setStatus('loose')
		else
			start()
	}, [points])

	useEffect(() => {
		if (firstname.value && firstname.gender)
			setLoaded(true)
	}, [firstname])

	const start = async () => {
		setLoaded(false)
		setStatus('playing')

		const res = await axios.get('http://127.0.0.1:8000/random')
		setFirstname({ value: res.data.firstname, gender: res.data.gender })
	}

	const restart = () => {
		setStatus('playing')
		setPoints(10)
	}

	const answer = async (gender) => {
		if (loaded && status === 'playing')
			gender === firstname.gender ? setPoints(points + 1) : setPoints(points - 1)
	}

	return (
		<div className="center-abs center" style={{width: 800, maxWidth: '90%'}}>
			Points: {points} / Status: {status}
			{
				loaded ? (
					<div className="mt-2" style={{fontSize: 28}}>
						What is gender of: {firstname.value} ? (answer: {firstname.gender})
					</div>
				) : <div className="mt-2">Loading...</div>
			}
			{
				status !== 'playing' ? (
					<div className="row center-h mt-2">
						<Button content="Restart" action={() => restart()} />
					</div>
				) : (
					<div className="row center-h mt-2">
						<Button content="Male" action={() => answer('male')} />
						<Button className="ml-1" content="Female" action={() => answer('female')} />
					</div>
				)
			}
		</div>
	)
}

export default Game
