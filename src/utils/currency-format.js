/**
 * Format number to Rupiah.
 * @param {number} number Number to format.
 */
function toRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

export {
    toRupiah,
};
