import React from 'react'

import PropTypes from 'prop-types'

import styles from './container.module.css'

const Container = (props) => {
  return (
    <div className={styles['container']}>
      <span>{props.text}</span>
      <img
        src={props.image_src}
        alt={props.image_alt}
        className={styles['image']}
      />
      <span className={styles['text1']}>
        <span className={styles['text2']}>$999</span>
        <span className={styles['text3']}>&amp;#8203;</span>
      </span>
      <span className={styles['text4']}>{props.text1}</span>
    </div>
  )
}

Container.defaultProps = {
  text: 'Similar goods',
  image_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  image_alt: 'image',
  text1: 'goods name',
}

Container.propTypes = {
  text: PropTypes.string,
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  text1: PropTypes.string,
}

export default Container
