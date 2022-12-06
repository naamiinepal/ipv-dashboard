import Samip from "../../images/4.jpg";
import AmanSir from "../../images/AmanSir.jpeg";
import BisheshSir from "../../images/BisheshSir.jpeg";
import Nirajan from "../../images/Nirajan.jpg";
import Rabin from "../../images/Rabin.jpg";
import Safal from "../../images/Safal.png";
import Team from "./Team";
import TeamCollection from "./TeamCollection";

const Teams: React.FunctionComponent = () => (
  <div className="text-center">
    <TeamCollection title="Our Team">
      <Team src={Nirajan} alt="Nirajan" name="Nirajan Basnet" />
      <Team src={Rabin} alt="Rabin" name="Rabin Adhikari" />
      <Team src={Safal} alt="Safal" name="Safal Thapaliya" />
      <Team src={Samip} alt="Samip" name="Samip Poudel" />
    </TeamCollection>
    <TeamCollection title="Our Supervisors">
      <Team
        src={AmanSir}
        alt="Aman Shakya"
        name="Dr. Aman Shakya"
        institution={
          <>
            <div>Assistant Professor</div>
            <div>IOE, Pulchowk Campus</div>
          </>
        }
      />
      <Team
        src={BisheshSir}
        alt="Bishesh Khanal"
        name="Dr. Bishesh Khanal"
        institution={
          <>
            <div>Director</div>
            <div>NAAMII</div>
          </>
        }
      />
    </TeamCollection>
  </div>
);

export default Teams;
