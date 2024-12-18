
export function randomCodeGenerator(length: number = 5): string {
    if (length < 2) {
        throw new Error("Length must be at least 2 to include both numbers and letters.");
    }

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const allCharacters = letters + numbers;

    let coupon = "";

    coupon += letters[Math.floor(Math.random() * letters.length)];
    coupon += numbers[Math.floor(Math.random() * numbers.length)];

    for (let i = 2; i < length; i++) {
        coupon += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    const couponArray = coupon.split("");
    for (let i = couponArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [couponArray[i], couponArray[j]] = [couponArray[j], couponArray[i]];
    }

    return couponArray.join("");
}
