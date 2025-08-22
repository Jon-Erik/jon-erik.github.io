import React, { useState } from 'react'
import PageContentWrapper from '../components/PageContentWrapper'
import Button from '../components/Button'
import woodblock from '../static/woodblock.mp3' // from pixabay
import samples from '../static/samples'
import './Metronome.styl'
import useSound from 'use-sound'

const ONE_MINUTE = 60000

function Metronome() {
  const [intervalState, setIntervalState] = useState(null)
  const [timeoutState, setTimeoutState] = useState([])
  const [activeRhythm, setActiveRhythm] = useState([])
  const [bpm, setBpm] = useState(60)
  const [play, opts] = useSound(woodblock)

  /* Beats is an array of objects. Each object has either: 
    - "sound" string (can be null if silent)
    - "subdivisions" array with more objects in same format
  */
  const [beats, setBeats] = useState([{ sound: 'woodblock' }])

  const totalMsOfBeats = (ONE_MINUTE / bpm) * beats.length

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
          const subdivisionParents = parents.concat(index + 1)
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
          if (timeout.sound) {
            play()
          }
          setActiveRhythm(timeout.activeRhythm)
        }, timeout.ms)
        timeoutIDs.push(timeoutID)
      })

      const interval = setInterval(() => {
        timeouts.forEach((timeout) => {
          const timeoutID = setTimeout(() => {
            if (timeout.sound) {
              play()
            }
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
        <div className="rhythm-visualization">
          {beat.subdivisions &&
            beat.subdivisions.map((subdivision, subIndex) =>
              displayBeat(
                subdivision,
                subIndex,
                level + 1,
                parents.concat(index + 1)
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
