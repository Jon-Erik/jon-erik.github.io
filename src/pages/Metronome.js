import React, { useEffect, useState } from 'react'
import PageContentWrapper from '../components/PageContentWrapper'
import Button from '../components/Button'
import woodblock from '../static/woodblock.mp3' // from pixabay
import './Metronome.styl'
import useSound from 'use-sound'

const ONE_MINUTE = 60000

function Metronome() {
  const [intervalState, setIntervalState] = useState(null)
  const [timeoutState, setTimeoutState] = useState([])
  const [bpm, setBpm] = useState(72)
  const [play, opts] = useSound(woodblock)

  // const beats = [
  //   {
  //     sound: 'woodblock',
  //     play: true,
  //   },
  //   {
  //     sound: null,
  //     play: null,
  //     subdivisions: [
  //       {
  //         sound: 'woodblock',
  //         play: false,
  //       },
  //       {
  //         sound: 'woodblock',
  //         play: true,
  //       }
  //     ]
  //   }
  // ]

  const beats = [
    {
      sound: 'woodblock',
      play: false,
      subdivisions: [
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: false,
          subdivisions: [
            {
              sound: 'woodblock',
              play: true
            },
            {
              sound: 'woodblock',
              play: true
            },
            {
              sound: 'woodblock',
              play: true
            }
          ]
        }
      ]
    },
    {
      sound: 'woodblock',
      play: false,
      subdivisions: [
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: false,
          subdivisions: [
            {
              sound: 'woodblock',
              play: true
            },
            {
              sound: 'woodblock',
              play: true
            },
            {
              sound: 'woodblock',
              play: true
            }
          ]
        }
      ]
    },
    {
      sound: 'woodblock',
      play: true,
      subdivisions: [
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: true
        }
      ]
    },
    {
      sound: 'woodblock',
      play: false,
      subdivisions: [
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: false,
          subdivisions: [
            {
              sound: 'woodblock',
              play: true
            },
            {
              sound: 'woodblock',
              play: true
            },
            {
              sound: 'woodblock',
              play: true
            }
          ]
        }
      ]
    },
    {
      sound: 'woodblock',
      play: false,
      subdivisions: [
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: false,
          subdivisions: [
            {
              sound: 'woodblock',
              play: true
            },
            {
              sound: 'woodblock',
              play: true
            },
            {
              sound: 'woodblock',
              play: true
            }
          ]
        }
      ]
    },
    {
      sound: 'woodblock',
      play: false,
      subdivisions: [
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: true
        },
        {
          sound: 'woodblock',
          play: true
        }
      ]
    }
  ]

  const totalMsOfBeats = (ONE_MINUTE / bpm) * beats.length

  function getTimeouts(divisions) {
    const timeouts = []

    function loopArr(arr, timeFromStartOfInterval, numOfDivisionsThisLevel) {
      arr.forEach((division, index) => {
        const timeToStartOfDivision =
          timeFromStartOfInterval +
          index * (totalMsOfBeats / numOfDivisionsThisLevel)

        if (division.subdivisions && division.subdivisions.length > 1) {
          loopArr(
            division.subdivisions,
            timeToStartOfDivision,
            numOfDivisionsThisLevel * division.subdivisions.length
          )
        } else {
          if (division.play && division.sound) {
            timeouts.push({
              ms: timeToStartOfDivision,
              sound: division.sound
            })
          }
        }
      })
    }

    loopArr(divisions, 0, divisions.length)

    return timeouts
  }

  function toggle() {
    if (intervalState) {
      opts.stop()
      clearInterval(intervalState)
      setIntervalState(null)

      timeoutState.forEach((timeoutID) => {
        clearInterval(timeoutID)
      })
      setTimeoutState([])
    } else {
      const timeouts = getTimeouts(beats)
      const timeoutIDs = []

      timeouts.forEach((timeout) => {
        const timeoutID = setTimeout(() => play(), timeout.ms)
        timeoutIDs.push(timeoutID)
      })

      const interval = setInterval(() => {
        timeouts.forEach((timeout) => {
          const timeoutID = setTimeout(() => play(), timeout.ms)
          if (!timeoutIDs.includes(timeoutID)) {
            timeoutIDs.push(timeoutID)
          }
        })
      }, totalMsOfBeats)

      setIntervalState(interval)
      setTimeoutState(timeoutIDs)
    }
  }

  return (
    <PageContentWrapper>
      <div className="metronome">
        <div>Metronome bpm = {bpm}</div>
        <br />
        <Button text={intervalState ? 'Stop' : 'Play'} onClick={toggle} />
      </div>
    </PageContentWrapper>
  )
}

export default Metronome
