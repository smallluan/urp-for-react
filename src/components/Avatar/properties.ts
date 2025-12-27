import { Avatar } from "./type"

export const defaultProps: Avatar = {
  className: '',
  style: {},
  alt: '',
  src: '',
  imageProps: {
    objectFit: 'cover',
    lazy: true,
    loading: '',
    error: ''
  },
  size: 'normal',
  shape: 'rect',
  text: '',
  icon: ''
}
