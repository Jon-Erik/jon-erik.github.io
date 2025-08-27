import React, { useState } from 'react'
import PageContentWrapper from '../components/PageContentWrapper'
import Button from '../components/Button'
import useSound from 'use-sound'
import './Metronome.styl'

import { MdOutlineDeleteForever } from 'react-icons/md'
import { IoMdAddCircleOutline } from 'react-icons/io'

// Sound files
import woodblock from '../static/woodblock.mp3' // from pixabay
import woodblockBright from '../static/wood-block-bright.wav'
import woodblockChopped from '../static/wood-block-chopped.wav'

// Examples
import samples from '../static/samples'
import { current } from '@reduxjs/toolkit'

const ONE_MINUTE = 60000

function Metronome() {
  // IDs returned from setInterval()
  const [intervalState, setIntervalState] = useState(null)

  // ID returned from setTimeout()
  const [timeoutState, setTimeoutState] = useState([])

  // The rhythm division and subdivision(s) highlighted while playing
  const [activeRhythm, setActiveRhythm] = useState([])

  // Metronome sounds init
  const [playWoodblock, woodblockOpts] = useSound(woodblock)
  const [playWoodblockBright, woodblockBrightOpts] = useSound(woodblockBright)
  const [playWoodblockChopped, woodblockChoppedOpts] =
    useSound(woodblockChopped)

  function playSound(soundStr) {
    switch (soundStr) {
      case 'woodblock':
        playWoodblock()
        break
      case 'woodblockBright':
        playWoodblockBright()
        break
      case 'woodblockChopped':
        playWoodblockChopped()
        break
      default:
        // play nothing
        break
    }
  }

  /* Beat state - Beats is an array of objects. Each object has either: 
  - "sound" string (can be null if silent)
  - "subdivisions" array with more objects in same format
  */
  const defaultBeat = { sound: 'woodblock' }
  const [bpm, setBpm] = useState(60)
  const [beats, setBeats] = useState([Object.assign({}, defaultBeat)])
  const totalMsOfBeats = (ONE_MINUTE / bpm) * beats.length

  function addBeatOrSubdivision(parents = []) {
    let newBeats = [...beats]
    let currentArr = newBeats

    // Using the parent indices, find the array or nested array to add to
    parents.forEach((parentIndex) => {
      // Create subdivisions array if it does not exist
      if (currentArr[parentIndex] && !currentArr[parentIndex].subdivisions) {
        currentArr[parentIndex].subdivisions = []
      }

      currentArr = currentArr[parentIndex].subdivisions
    })

    // If array is empty add two default beats. Otherwise just add one
    if (!currentArr.length) {
      currentArr.push(
        Object.assign({}, defaultBeat),
        Object.assign({}, defaultBeat)
      )
    } else {
      currentArr.push(Object.assign({}, defaultBeat))
    }

    setBeats(newBeats)
  }

  function removeBeatOrSubdivision(index, parents = []) {
    const newBeats = [...beats]
    let currentArr = newBeats

    // Using the parent indices, find the array or nested array to add to
    parents.forEach((parentIndex) => {
      currentArr = currentArr[parentIndex].subdivisions
    })

    if (!parents.length && currentArr.length <= 1) {
      // Do nothing - don't remove the only beat at the top level
    } else {
      currentArr.splice(index, 1)
    }

    setBeats(newBeats)
  }

  // Determine the points in time to play metronome sounds in the time length of beat cycle
  function getTimeouts(divisions) {
    const timeouts = []

    function loopArr(
      arr,
      timeFromStartOfInterval,
      numOfDivisionsThisLevel,
      parents = []
    ) {
      arr.forEach((division, index) => {
        const timeToStartOfDivision =
          timeFromStartOfInterval +
          index * (totalMsOfBeats / numOfDivisionsThisLevel)

        if (division.subdivisions && division.subdivisions.length > 1) {
          const subdivisionParents = parents.concat(index)
          loopArr(
            division.subdivisions,
            timeToStartOfDivision,
            numOfDivisionsThisLevel * division.subdivisions.length,
            subdivisionParents
          )
        } else {
          timeouts.push({
            ms: timeToStartOfDivision,
            sound: division.sound,
            activeRhythm: parents.concat(index + 1)
          })
        }
      })
    }

    loopArr(divisions, 0, divisions.length)

    return timeouts
  }

  // Stop/start metronome
  function toggle() {
    if (intervalState) {
      clearInterval(intervalState)
      setIntervalState(null)
      timeoutState.forEach((timeoutID) => {
        clearInterval(timeoutID)
      })
      setTimeoutState([])
      setActiveRhythm([])
    } else {
      const timeouts = getTimeouts(beats)
      const timeoutIDs = []

      timeouts.forEach((timeout) => {
        const timeoutID = setTimeout(() => {
          playSound(timeout.sound)
          setActiveRhythm(timeout.activeRhythm)
        }, timeout.ms)
        timeoutIDs.push(timeoutID)
      })

      const interval = setInterval(() => {
        timeouts.forEach((timeout) => {
          const timeoutID = setTimeout(() => {
            playSound(timeout.sound)
            setActiveRhythm(timeout.activeRhythm)
          }, timeout.ms)
          if (!timeoutIDs.includes(timeoutID)) {
            timeoutIDs.push(timeoutID)
          }
        })
      }, totalMsOfBeats)

      setIntervalState(interval)
      setTimeoutState(timeoutIDs)
    }
  }

  // Recursive function to display beat and subdivisions and determine if beat/subdivision is active
  function displayBeat(beat, index, level = 1, parents = []) {
    const currentBeatLocation = parents.concat(index + 1)
    let active = true

    currentBeatLocation.forEach((beatLevel, blIndex) => {
      if (activeRhythm[blIndex] && activeRhythm[blIndex] === beatLevel) {
        // do nothing
      } else {
        active = false
      }
    })

    return (
      <div
        className={`rhythm-division level-${level}`}
        key={level + ':' + index}
      >
        <span className={active ? 'active' : ''}>{index + 1}</span>
        <span
          className="remove-beat"
          onClick={() => addBeatOrSubdivision([...parents, index])}
        >
          <IoMdAddCircleOutline />
        </span>
        <span
          className="remove-beat"
          onClick={() => removeBeatOrSubdivision(index, parents)}
        >
          <MdOutlineDeleteForever />
        </span>
        <div className="rhythm-visualization">
          {beat.subdivisions &&
            beat.subdivisions.map((subdivision, subIndex) =>
              displayBeat(
                subdivision,
                subIndex,
                level + 1,
                parents.concat(index)
              )
            )}
        </div>
      </div>
    )
  }

  return (
    <PageContentWrapper>
      <div className="metronome">
        <div>
          <h3>Tempo</h3>
          <p>
            bpm ={' '}
            <input
              type="number"
              value={bpm}
              onChange={(e) => {
                setBpm(Math.round(e.target.value))
              }}
              max={200}
              min={0}
              step={1}
            />
          </p>
        </div>
        <div>
          <h3>Rhythm</h3>
          <Button text="Add Beat" onClick={() => addBeatOrSubdivision()} />
          <br />
          <br />
          <div className="rhythm-visualization">
            {beats.map((beat, index) => displayBeat(beat, index))}
          </div>
        </div>
        <br />
        <Button text={intervalState ? 'Stop' : 'Play'} onClick={toggle} />
        <div>
          <h3>Samples</h3>
          {samples.map((sample) => {
            const { name, beats, bpm } = sample
            return (
              <div key={name}>
                {name}{' '}
                <Button
                  text="set"
                  onClick={() => {
                    setBpm(bpm)
                    setBeats(beats)
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </PageContentWrapper>
  )
}

export default Metronome
