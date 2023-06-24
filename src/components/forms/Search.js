import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Search=()=> {
  // hooks
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        style={{ borderRadius: "0px" ,height:"40px"}}
        className="form-control mt-2"
        placeholder="Search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
      />
      <button
        className="btn btn-outline-primary mt-2"
        type="submit"
        style={{ borderRadius: "0px" ,height:"40px"}}
      >
        Search
      </button>
    </form>
  );
}

export default Search;