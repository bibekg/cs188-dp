import EXIF from 'exif-js'
import { dmsToDecimal } from './geo'

// Maps an EXIF 'Orientation' tag to the appropriate CSS transform key
// required to display the image correctly
export const orientationKeyToCSSTransform: { [num: number]: string } = {
  1: '', // properly oriented
  2: 'scaleY(-1)', // Mirror horizontally
  3: 'rotate(180deg)', // Rotate 180º clockwise
  4: 'scaleX(-1)', // Mirror vertically
  5: 'scaleY(-1) rotate(270deg)', // Mirror horizontally and rotate 270º clockwise
  6: 'rotate(90deg)', // Rotate 90º clockwise
  7: 'scaleY(-1) rotate(90deg)', // Mirror horizontally and rotate 90º clockwise
  8: 'rotate(270deg)' // Rotate 270º clockwise
}

export const getPhotoGeoData = (img: HTMLImageElement): Promise<any> => {
  return new Promise((resolve, reject) => {
    const photo: any = {}
    // Bad API, should be allowed since we HAVE to pass it an image element for it to work
    // @ts-ignore
    EXIF.getData(img, function() {
      // @ts-ignore
      const exifData = this as any
      const latExif = {
        value: EXIF.getTag(exifData, 'GPSLatitude') as number[],
        dir: EXIF.getTag(exifData, 'GPSLatitudeRef') as string
      }
      const lngExif = {
        value: EXIF.getTag(exifData, 'GPSLongitude') as number[],
        dir: EXIF.getTag(exifData, 'GPSLongitudeRef') as string
      }

      const orientationExif = EXIF.getTag(exifData, 'Orientation')
      photo.orientation = orientationKeyToCSSTransform[orientationExif]

      // If coordinates exist, update photo object
      if (latExif.value && latExif.dir && lngExif.value && lngExif.dir) {
        const absLat = dmsToDecimal(latExif.value.map(val => val.valueOf()))
        const lat = latExif.dir.toLowerCase() === 's' ? -absLat : absLat
        const absLng = dmsToDecimal(lngExif.value.map(val => val.valueOf()))
        const lng = lngExif.dir.toLowerCase() === 'w' ? -absLng : absLng

        if (lat && lng) {
          photo.coordinates = { lat, lng }
        }
      }

      resolve(photo)
    })
  })
}

interface PhotoDetails {
  dataURL: string
  orientation: string
  coordinates: {
    lat: number
    lng: number
  }
}

export const getPhotoDetails = (file: File): Promise<PhotoDetails> => {
  const photo: any = {
    file,
    dataURL: null,
    orientation: null,
    coordinates: null
  }
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    // When the file reader finishes reading the selected file
    reader.onload = (event: ProgressEvent) => {
      // Create a hidden img tag on the document (required in order to use the
      // exif-js library to parse it for metadata
      const img = document.createElement('img')
      img.hidden = true
      img.src = event.target.result as string
      photo.dataURL = img.src

      // Set a callback for when the image finishes loading on the page
      // Callback will try to extract coordinates from image metadata
      img.onload = () => {
        console.log('it loaded')
        getPhotoGeoData(img).then(({ coordinates, orientation }) => {
          photo.coordinates = coordinates
          photo.orientation = orientation
          document.body.removeChild(img)
          resolve(photo)
        })
      }

      // Add image onto DOM so that exif-js can properly parse it
      document.body.appendChild(img)
    }

    reader.readAsDataURL(file)
  })
}

const CLOUD_NAME = 'nomad-app'
const UPLOAD_PRESET_NAME = 'i2ovd7ks'

export const uploadToCloudinary = async (file: File) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', UPLOAD_PRESET_NAME)
  const response = await fetch(url, {
    method: 'POST',
    body: fd,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  return await response.json()
}
