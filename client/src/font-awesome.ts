import { library } from '@fortawesome/fontawesome-svg-core'
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

export const loadFonts = () => {
  library.add(faMusic, faPlayCircle, faHome, faSearch)
}
