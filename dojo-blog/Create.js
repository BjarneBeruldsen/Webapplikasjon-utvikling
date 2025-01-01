import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('Julie'); 
    const [isPending, setIsPending] = useState(false); 
    const history = useHistory(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author}; 

        setIsPending(true); 

        fetch('http://localhost:8000/blogs', {
            method: 'POST', 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('Ny blog lagt til'); 
            setIsPending(false); 
            history.push('/'); 
        })
    }

    return ( 
        <div className="create">
            <h2>Legg til ny blogg</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog tittel:</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>blog body:</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog forfatter:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Julie">Julie</option>
                    <option value="Wilhelm">Wilhelm</option>
                </select>
                { !isPending && <button>legg til blog</button>}
                { isPending && <button>Adding blog..</button>}
                <p>{ title }</p>
                <div> { body } </div>
                <p>{ author }</p>
            </form>
        </div>
     );
}
 
export default Create;