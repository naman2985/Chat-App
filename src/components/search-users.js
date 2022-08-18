export default function Search(props) {
    return (
        <input type='text' className="search" placeholder="Search for users" onChange={ props.handleSearchChange} />
    );
}
