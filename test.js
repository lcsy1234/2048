function findContentChildren(g, s) {
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
    let i=0,j=0
    let count=0
    while(i<g.length &&j<s.length){
        if(s[j]>=g[i]){
            count++
            i++
            j++
        }else{
            j++
        }
    }
    return count
}
console.log(findContentChildren([1,10,4,2],[1,2,4,3]))