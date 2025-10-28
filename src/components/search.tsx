import Form from 'next/form'

export const Search=()=>{
    return(
        <Form action="/products-db" className="flex gap-2">
            <input type="text" name="query" placeholder="Search products..." className="border px-2 py-1 rounded"/>
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
        </Form>
    )
}