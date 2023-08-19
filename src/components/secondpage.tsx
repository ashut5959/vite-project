import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Post from "../models/post";
import SecondComponent from "./secondp2";

interface SecondPageComponent1Props {
  isFirstPageFilled: boolean;
}
const SecondPage = ({ isFirstPageFilled }: SecondPageComponent1Props) => {
  const [data, setData] = useState<Post[]>([]);
  if (!isFirstPageFilled) {
    return null; // Prevent rendering if the first page is not filled
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Table
        </h1>
        <div style={{ height: 500 }}>
          <DataGrid rows={data} columns={columns} />
        </div>
        <SecondComponent />
      </div>
    </div>
  );
};

export default SecondPage;
