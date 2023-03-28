export const useOneSizeSmaller = (x: any) => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"]

    const index = sizes.indexOf(x)
    if (index==undefined) return undefined
    if (index >= 1) return sizes[index -1]
    else if (index <= 0) return sizes[0]
}