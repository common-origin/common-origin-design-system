import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import type Track from '../../interfaces/track'
import { IconButton, Stack, Typography } from './'
import tokens from '@/styles/tokens.json'

const { base: { spacing, color, border } } = tokens

type TrackItemProps = {
  track: Track
}

const TrackItemStyled = styled.div<{ $isPlaying: boolean }>`
  display: flex;
  width: 100%;
  background-color: ${({ $isPlaying }) => $isPlaying ? color.neutral['000'] : tokens.semantic.color.background.surface};
  padding: ${spacing[2]};
  padding-left: ${spacing[4]};
  border-radius: ${border.radius[3]};
  transition: background-color 0.2s ease;
`

const TrackContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  button {
    background-color: transparent;
    margin: 0;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${color.neutral[300]};
    }

    &:focus {
      outline: 2px solid ${tokens.semantic.color.border.strong};
      outline-offset: 2px;
    }
  }
`

const TrackingBar = styled.div<{ $isPlaying: boolean }>`
  width: 100%;
  height: ${({ $isPlaying }) => $isPlaying ? '8px' : '0px'};
  background-color: ${color.neutral[400]};
  cursor: pointer;
  position: relative;
  margin: ${spacing[2]} 0;
  border-radius: ${border.radius[1]};
  overflow: hidden;
  transition: height 0.2s ease;

  &:focus {
    outline: 2px solid ${tokens.semantic.color.border.strong};
    outline-offset: 2px;
  }
`

const Progress = styled.div<{ $progress: number }>`
  height: 100%;
  background-color: ${tokens.semantic.color.background.inverse};
  width: ${({ $progress }) => $progress}%;
  transition: width 0.1s ease;
  border-radius: ${border.radius[1]};
`

const TrackContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateCurrentTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration)
      const handleEnded = () => setIsPlaying(false)

      audio.addEventListener('timeupdate', updateCurrentTime)
      audio.addEventListener('loadedmetadata', updateDuration)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('timeupdate', updateCurrentTime)
        audio.removeEventListener('loadedmetadata', updateDuration)
        audio.removeEventListener('ended', handleEnded)
      }
    }
    return undefined
  }, [track.audioUrl])

  const progress = duration ? (currentTime / duration) * 100 : 0

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const totalWidth = rect.width
    const clickPositionRatio = clickPosition / totalWidth
    const newCurrentTime = duration * clickPositionRatio
    
    if (audioRef.current) {
      audioRef.current.currentTime = newCurrentTime
    }
  }

  const handleProgressBarKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const audio = audioRef.current
      if (audio) {
        const seekAmount = 5 // seconds
        const newTime = e.key === 'ArrowLeft' 
          ? Math.max(0, audio.currentTime - seekAmount)
          : Math.min(duration, audio.currentTime + seekAmount)
        audio.currentTime = newTime
      }
    }
  }

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const resetTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <TrackItemStyled $isPlaying={isPlaying}>
      <audio 
        ref={audioRef} 
        src={track.audioUrl} 
        preload="none"
        aria-label={`Audio track: ${track.title}`}
      />
      <TrackContainer>
        <TrackContentWrapper>
          <Stack direction='row' gap='sm' alignItems='center'>
            <Typography variant='body' color='default'>{track.title}</Typography>
            {isPlaying && duration > 0 && (
              <Typography variant='small' color='subdued'>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
            )}
          </Stack>
          <Stack direction='row' gap='sm' alignItems='center'>
            {isPlaying && (
              <IconButton 
                iconName='playBack' 
                size='small' 
                variant='secondary' 
                onClick={resetTrack}
                aria-label='Reset track to beginning'
              />
            )}
            <IconButton 
              iconName={isPlaying ? 'pause' : 'play'} 
              size='small' 
              variant='secondary' 
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause track' : 'Play track'}
            />
          </Stack>
        </TrackContentWrapper>
        {isPlaying && (
          <TrackingBar 
            $isPlaying={isPlaying} 
            onClick={handleProgressBarClick}
            onKeyDown={handleProgressBarKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Track progress"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          >
            <Progress $progress={progress} />
          </TrackingBar>
        )}
      </TrackContainer>
    </TrackItemStyled>
  )
}