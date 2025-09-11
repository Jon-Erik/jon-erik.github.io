import React, { useState, useEffect, useRef } from 'react'
import PageContentWrapper from '../components/PageContentWrapper'
import Button from '../components/Button'
import useSound from 'use-sound'
import './Metronome.styl'

import { MdOutlineDeleteForever } from 'react-icons/md'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'
import { elementOrParentsHaveClass } from '../services/utils'

// Sound files
import woodblock from '../static/metronome/woodblock.wav' // from pixabay
import woodblock2 from '../static/metronome/woodblock2.wav'
import woodblock3 from '../static/metronome/woodblock3.wav'

// Examples
import samples from '../static/samples'

const ONE_MINUTE = 60000
const COMMON_BPMS = [
  40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88,
  92, 96, 100, 112, 116, 120, 126, 130, 132, 138, 144, 152, 160, 168, 176, 184,
  192, 200
]

function Metronome() {
  // IDs returned from setInterval()
  const [intervalState, setIntervalState] = useState(null)
  const playingMetronome = intervalState !== null
  const [savedRhythms, setSavedRhythms] = useState([])

  // ID returned from setTimeout()
  const [timeoutState, setTimeoutState] = useState([])

  // The rhythm division and subdivision(s) highlighted while playing
  const [activeRhythm, setActiveRhythm] = useState([])

  // The menu open for a specific beat/division
  const [menuOpen, setMenuOpen] = useState([])
  const menuOpenRef = useRef(menuOpen)
  function toggleMenu(arr) {
    if (JSON.stringify(arr) === JSON.stringify(menuOpen) || !arr) {
      setMenuOpen([])
      menuOpenRef.current = []
    } else {
      setMenuOpen(arr)
      menuOpenRef.current = arr
    }
  }

  // Save name
  const [saveName, setSaveName] = useState('Rhythm')

  // Metronome sounds init
  const [playSoundOne, soundOneOpts] = useSound(woodblock)
  const [playSoundTwo, soundTwoOpts] = useSound(woodblock2)
  const [playSoundThree, soundThreeOpts] = useSound(woodblock3)

  function playSound(soundStr) {
    switch (soundStr) {
      case 'soundOne':
        playSoundOne()
        break
      case 'soundTwo':
        playSoundTwo()
        break
      case 'soundThree':
        playSoundThree()
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
  const defaultBeat = { sound: 'soundOne' }
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

      currentArr[parentIndex].sound = null

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
    let newBeats = [...beats]
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

    // Cycle through all beats and subdivisions, removing subdivisions with only one item
    // (if not on top level) and setting default sound
    function removeSingleSubdivisions(beats) {
      return beats.map((beat) => {
        if (beat.subdivisions && beat.subdivisions.length == 1) {
          delete beat.subdivisions
          beat.sound = 'soundOne'
        }

        if (beat.subdivisions) {
          removeSingleSubdivisions(beat.subdivisions)
        }

        return beat
      })
    }

    newBeats = removeSingleSubdivisions(newBeats)

    setBeats(newBeats)
  }

  function getNewSound(currentSoundStr) {
    switch (currentSoundStr) {
      case 'soundOne':
        return 'soundTwo'
      case 'soundTwo':
        return 'soundThree'
      case 'soundThree':
        return null
      case null:
        return 'soundOne'
      default:
        return null
        break
    }
  }

  function changeSound(index, parents = []) {
    let newBeats = [...beats]
    let currentArr = newBeats

    // Using the parent indices, find the array or nested array
    parents.forEach((parentIndex) => {
      currentArr = currentArr[parentIndex].subdivisions
    })

    const newSound = getNewSound(currentArr[index].sound)

    currentArr[index].sound = newSound
    playSound(newSound)

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
            activeRhythm: parents.concat(index)
          })
        }
      })
    }

    loopArr(divisions, 0, divisions.length)

    return timeouts
  }

  function saveRhythm() {
    const currentSaved = [...savedRhythms]
    const foundObj = currentSaved.find((i) => i.name === saveName)

    if (foundObj) {
      foundObj.bpm = bpm
      foundObj.beats = beats
    } else {
      const newObj = { name: saveName, bpm: bpm, beats: beats }
      currentSaved.push(newObj)
    }

    saveRhythms(currentSaved)
  }

  // Save to state and to local storage
  function saveRhythms(rhythms) {
    setSavedRhythms(rhythms)
    localStorage.setItem('savedRhythms', JSON.stringify(rhythms))
  }

  // Stop/start metronome
  function toggleMetronome(stop = false) {
    if (intervalState || stop) {
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
    const currentBeatLocation = parents.concat(index)
    let active = true
    let silent = beat.sound == null && !beat.subdivisions
    let timer

    currentBeatLocation.forEach((beatLocArrItem, blIndex) => {
      if (
        activeRhythm[blIndex] !== null &&
        activeRhythm[blIndex] === beatLocArrItem
      ) {
        // do nothing
      } else {
        active = false
      }
    })

    const isMenuOpen =
      JSON.stringify(currentBeatLocation) === JSON.stringify(menuOpen)

    const classNames = []
    if (active) classNames.push('active')
    if (silent) classNames.push('silent')
    if (isMenuOpen) classNames.push('menu-open')
    if (beat.sound) classNames.push(beat.sound)

    return (
      <div key={level + ':' + index} className={level == 1 ? 'main-beat' : ''}>
        <div
          className={`rhythm-division level-${level} ${classNames.join(' ')}`}
        >
          <div
            className="beat-label"
            onClick={(event) => {
              clearTimeout(timer)
              if (event.detail === 1) {
                timer = setTimeout(() => {
                  //console.log('SINGLE CLICK')
                  if (!beat.subdivisions) {
                    changeSound(index, parents)
                  }
                }, 200)
              } else if (event.detail === 2) {
                //console.log('DOUBLE CLICK')
                if (!playingMetronome) {
                  toggleMenu(currentBeatLocation)
                }
              }
            }}
          >
            <div>{index + 1}</div>
          </div>

          <div className={`beat-menu ${isMenuOpen ? 'menu-open' : ''}`}>
            {/* <FaCaretUp className="caret" /> */}
            <div className="items">
              {level < 4 && (
                <div
                  className="menu-item"
                  onClick={() => {
                    toggleMenu()
                    addBeatOrSubdivision([...parents, index])
                  }}
                >
                  <IoMdAddCircleOutline /> Add subdivision
                </div>
              )}
              <div
                className="menu-item"
                onClick={() => {
                  toggleMenu()
                  removeBeatOrSubdivision(index, parents)
                }}
              >
                <MdOutlineDeleteForever /> Remove{' '}
                {level == 1 ? 'beat' : 'subdivision'}
              </div>
              {/* {!beat.subdivisions && (
                <div
                  className="menu-item"
                  onClick={() => changeSound(index, parents)}
                >
                  <AiFillSound /> Change sound ({beat.sound || 'silent'})
                </div>
              )} */}
            </div>
            <div>
              <AiOutlineClose
                className="close"
                title="Close"
                onClick={() => toggleMenu()}
              />
            </div>
          </div>
        </div>
        <div className="rhythm-visualization">
          {beat.subdivisions &&
            beat.subdivisions.map((subdivision, subIndex) =>
              displayBeat(subdivision, subIndex, level + 1, currentBeatLocation)
            )}
        </div>
      </div>
    )
  }

  useEffect(() => {
    function onClickHandler(e) {
      const clickedInBeatMenu = elementOrParentsHaveClass('beat-menu', e.target)
      const clickedInBeatToggle = elementOrParentsHaveClass(
        'beat-label',
        e.target
      )

      if (
        menuOpenRef.current.length &&
        !clickedInBeatMenu &&
        !clickedInBeatToggle
      ) {
        toggleMenu(setMenuOpen([]))
      }
    }

    document.addEventListener('click', onClickHandler)

    const saved = localStorage.getItem('savedRhythms') || '[]'
    setSavedRhythms(JSON.parse(saved))

    return () => {
      document.removeEventListener('click', onClickHandler)
    }
  }, [])

  return (
    <PageContentWrapper>
      <div className="metronome">
        <div>
          <h2>Metronome</h2>
          <p>
            This metronome is meant to model and play complex rhythms for
            practice.
          </p>
          <p>
            Click/tap once on a beat or subdivision to change the sound.
            Beats/subdivisions that are striped are silent. Sound can be changed
            only on the lowest displayed subdivision for that beat or
            subidivision.
          </p>
          <p>
            Double click/tap on a beat or subdivision to add or remove a
            subdivision.
          </p>
          <p>
            Set rhythms from the <a href="#examples">examples below</a> to get
            started.
          </p>
          <h3>Tempo</h3>
          <div className="bpm-input">
            BPM ={' '}
            <input
              type="number"
              value={bpm}
              onChange={(e) => {
                setBpm(Math.round(e.target.value))
              }}
              max={250}
              min={0}
              step={1}
              disabled={playingMetronome}
            />
          </div>
          <div className="common-bpms">
            {COMMON_BPMS.map((val) => (
              <div
                key={val}
                className={`bpm-opt ${val === bpm ? 'active' : ''}`}
                onClick={() => setBpm(val)}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Rhythm</h3>
          <div>
            <Button text="Add Beat" onClick={() => addBeatOrSubdivision()} />
            <Button
              text={intervalState ? 'Stop' : 'Play'}
              onClick={() => toggleMetronome()}
              className="stop-play"
            />
            <Button
              text="clear"
              onClick={() => setBeats([defaultBeat])}
              className="stop-play"
              disabled={playingMetronome}
            />
          </div>
          <br />
          <div className="rhythm-visualization">
            {beats.map((beat, index) => displayBeat(beat, index))}
          </div>
          <div>
            <input
              type="text"
              value={saveName}
              onChange={(e) => {
                setSaveName(e.target.value)
              }}
            />
            <br />
            <br />
            <Button text="Save to Browser" onClick={() => saveRhythm()} />
          </div>
        </div>
        <br />
        <div>
          <h3 id="examples">Examples</h3>
          <table className="examples">
            <tbody>
              {samples.map((sample) => {
                const { name, beats, bpm } = sample
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      <Button
                        text="set"
                        onClick={() => {
                          setBpm(bpm)
                          setBeats(beats)
                        }}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div>
          <h3 id="examples">Saved</h3>
          <table className="examples">
            <tbody>
              {savedRhythms.map((sample) => {
                const { name, beats, bpm } = sample
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      <Button
                        text="set"
                        onClick={() => {
                          setBpm(bpm)
                          setBeats(beats)
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        text="delete"
                        onClick={() => {
                          const currentSaved = [...savedRhythms]
                          const filtered = currentSaved.filter(
                            (i) => i.name !== name
                          )
                          saveRhythms(filtered)
                        }}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageContentWrapper>
  )
}

export default Metronome
