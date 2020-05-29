import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import axios from "axios";
import { Reactions } from "../../services/reactions";
import Graph from "../../components/graph";
import { Reaction } from "../../models/reaction";

const Home: FunctionalComponent = () => {
  const [reactions, setReactions] = useState<Reaction[] | undefined>(undefined);

  useEffect(() => {
    // service for fetching data - axios
    // mock data saved in json file
    // fetching only once(when component did mount)

    // axios
    //   .get("../mock_data/reactions.json")
    //   .then((res) => setReactions(res.data.data));

    // or
    const reactions = new Reactions();
    reactions.reactionsDataFetch.then((res: any) => setReactions(res.data));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <Graph data={reactions} />
    </div>
  );
};

export default Home;
