import {NextPage} from "next";
import TodoContainer from "@/components/todos/TodoContainer/TodoContainer";
import {fetchTodos} from "@/lib/backend/api";

const Home:NextPage = async () =>  {
    const initialTodos = await fetchTodos();
    return (
      <div className="w-full flex justify-center max-w-[1560px]">
          <TodoContainer initialTodos={initialTodos} />
      </div>
  );
}

export default Home;
