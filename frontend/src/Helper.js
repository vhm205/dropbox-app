export const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const isObjEmpty = obj => {
	for (var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
		  return false;
		}
	}
	return true;
}

export const toast = (Swal, icon, title, time = 3000, showProgress = false) => {
	return (
		Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: time,
			timerProgressBar: showProgress,
			onOpen: (toast) => {
			  toast.addEventListener('mouseenter', Swal.stopTimer)
			  toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		}).fire({
			icon: icon,
			title: title
		})
	)
}
