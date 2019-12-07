import { library } from '@fortawesome/fontawesome-svg-core'
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons/faPlayCircle'
import { faRandom } from '@fortawesome/free-solid-svg-icons/faRandom'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons/faStepBackward'
import { faStepForward } from '@fortawesome/free-solid-svg-icons/faStepForward'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons/faRedoAlt'
import { faPauseCircle } from '@fortawesome/free-regular-svg-icons/faPauseCircle'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp'
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons/faVolumeMute'

export const loadIcons = () => {
  library.add(
    faMusic,
    faPlayCircle,
    faPauseCircle,
    faHome,
    faSearch,
    faRandom,
    faStepBackward,
    faStepForward,
    faRedoAlt,
    faVolumeUp,
    faVolumeMute
  )
}
