import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swal = withReactContent(Swal);

/**
 * @param {Object} options
 * @param {string} options.title
 * @param {string=} options.confirmBtnText
 * @param {string=} options.cancelBtnText
 * @param {() => void} options.preConfirm
 */
const swalConfirm = (options) => {
  return swal.fire({
    width: '400px',
    position: 'top',
    title: <div className="shipdeo-swal-title">{options.title}</div>,
    showCloseButton: true,
    showCancelButton: true,
    closeButtonHtml: <img src="/img/close.png"/>,
    confirmButtonText: options.confirmBtnText || 'Ya',
    cancelButtonText: options.cancelBtnText || 'Tidak',
    showLoaderOnConfirm: true,
    preConfirm: options.preConfirm,
    allowOutsideClick: () => !swal.isLoading()
  })
}

/**
 * @param {Object} options
 * @param {string} options.title
 * @param {string=} options.confirmBtnText
 */
const swalSuccess = (options) => {
  return swal.fire({
    title: (
      <div className="shipdeo-swal-title">
        <p>{options.title}</p>
        <img src="/img/modal-success.png"/>
      </div>
    ),
    position: 'top',
    showCloseButton: true,
    closeButtonHtml: <img src="/img/close.png"/>,
    confirmButtonText: options.confirmBtnText || 'Continue',
  });
}

/**
 * @param {Object} options
 * @param {string} options.title
 * @param {string=} options.confirmBtnText
 */
const swalError = (options) => {
  return swal.fire({
    title: (
      <div className="shipdeo-swal-title">
        <p>{options.title}</p>
        <div className="shipdeo-swal-icon-error"></div>
      </div>
    ),
    position: 'top',
    showCloseButton: true,
    closeButtonHtml: <img src="/img/close.png"/>,
    confirmButtonText: options.confirmBtnText || 'Continue',
  });
}

export { swalConfirm, swalSuccess, swalError, swal };
