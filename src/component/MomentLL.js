import moment from "moment";
import 'moment/locale/id';

const MomentLL = ({ date }) => {
    return moment(date).format('LL');
}

export default MomentLL;