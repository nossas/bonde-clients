import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import {
  Card,
  Flexbox,
  Image,
  Text,
  Title
} from '../../'
import IconColorful from '../../content/IconColorful/IconColorful'

const textColor = '#4a4a4a'

const placeHolderShimmer = keyframes`
  0% { -webkit-transform: translateX(-180%) }
  100% { -webkit-transform: translateX(70%) }
`;

const BackgroundMasker = styled.div`
  background: #fff;
  position: absolute;
`

const AnimatedBackground = styled.div`
  animation-name: ${placeHolderShimmer};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, transparent 30%, #dddddd 70%, transparent 100%);
  height: 300px;
  position: relative;
`

const PanelLoading = styled(({ className, minHeight, title }) => (
  <Card title={title} minHeight={minHeight}>
    <div className={className}>
      <AnimatedBackground />
      <BackgroundMasker style={{ top: 182, left: 0, right: 0, height: 18 }} />
      <BackgroundMasker style={{ top: 185, bottom: 0, width: 18 }} />
      <BackgroundMasker style={{ top: 200, left: 185, right: 0, height: 18 }} />
      <BackgroundMasker style={{ top: 218, left: 0, right: 0, height: 12 }} />
      <BackgroundMasker style={{ top: 230, left: 254, right: 0, height: 14 }} />
      <BackgroundMasker style={{ top: 244, left: 0, right: 0, height: 18 }} />
      <BackgroundMasker style={{ top: 262, left: 120, right: 0, height: 10 }} />
      <BackgroundMasker style={{ top: 272, left: 0, right: 0, height: 28 }} />
    </div>
  </Card>
))`
  background: #eeeeee;
  border-color: #e5e6e9 #dfe0e4 #d0d1d5;
  min-height: 300px;
  position: relative;
  overflow: hidden;
`

const DefaultImage = styled(({ className }) => (
  <div className={className}>
    <IconColorful name='community' size={130} />
  </div>
))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 185px;
  background-color: #424242;
`

const Panel = ({
  loading,
  image,
  minHeight,
  sectionTitle,
  author,
  title,
  description
}) => loading ? <PanelLoading title={sectionTitle} minHeight={minHeight} /> : (
  <Card title={sectionTitle} minHeight={minHeight}>
    {image
      ? <Image src={image} height={185} />
      : <DefaultImage />
    }

    <Flexbox padding={{ x: 16, y: 14 }}>
      <Title.H4>{title}</Title.H4>
      <Text fontSize={16} lineHeight={1.31} color={textColor} margin={{ y: 8 }}>
        {description}
      </Text>
      <Text fontSize={13} lineHeight={1.85} color={textColor}>
        {author}
      </Text>
    </Flexbox>
  </Card>
)

const { bool, string, number } = PropTypes

Panel.propTypes = {
  loading: bool,
  sectionTitle: string,
  minHeight: number,
  image: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  author: string.isRequired
}

Panel.defaultProps = {
  loading: false,
  minHeight: 320
}

/* @component */
export default Panel
