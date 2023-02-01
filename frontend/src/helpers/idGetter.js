export default function getIds(Links){
    const output = []
    console.log(Links)
    for(const link of Links) {
        output.push(link.split('/').reverse()[1])
    }
    console.log(output)
    return output
}
