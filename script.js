const People = [
    {
        name: 'Sanyi',
        age: 34
    },
    {
        name: 'MAri',
        age: 23
    },
    {
        name: 'juli',
        age: 10
    }
]

const over18 = People.filter(person => person.age > 18)

console.log(over18)
