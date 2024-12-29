export function formatRupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
}
export function calculateDateDifference(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return Math.max(0, dayDifference);
}
