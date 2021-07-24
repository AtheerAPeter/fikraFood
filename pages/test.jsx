import ExpandCard from "../components/ExpadnCard";
import MainLayout from "../components/MainLayout";

const Test = () => {
  return (
    <MainLayout>
      <div className="grid">
        <ExpandCard />
        <ExpandCard />
        <ExpandCard />
        <ExpandCard />
        <ExpandCard />
        <ExpandCard />
      </div>
    </MainLayout>
  );
};

export default Test;
