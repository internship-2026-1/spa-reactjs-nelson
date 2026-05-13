export class StringUtils {

    static toSafeString(value){
        if(value === null || value === undefined){
            return '';
        }
        return String(value);
    }

    static normalizeSpaces(value) {
        return this.toSafeString(value).trim().replace(/\s+/g, ' ');
    }

    static capitalize(value = "") {
        const normalizedValue = this.normalizeSpaces(value);
        if (!normalizedValue) return "";
        return normalizedValue.charAt(0).toUpperCase() + normalizedValue.slice(1).toLowerCase();
    }

    static toTitleCase(value = ""){
        const normalizedValue = this.normalizeSpaces(value);
        if (!normalizedValue) return "";
        return normalizedValue.split(' ').map(word => this.capitalize(word)).join(' ');
    }

    static truncate(value = "", max, suffix = "...") {
        const safeValue = this.toSafeString(value);

        const safeMax = Number(max);

        if (!safeValue) {
            return '';
        }

        if (!Number.isFinite(safeMax) || safeMax < 0) {
            return safeValue;
        }

        if (safeValue.length <= safeMax) {
            return safeValue;
        }

        return `${safeValue.slice(0, safeMax)}${suffix}`;
    }
}