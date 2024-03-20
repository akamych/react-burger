import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../services/Store";
import {
  selectFeedTotal,
  selectFeedTotalToday,
} from "../../../services/reducers/WebSocketReducer";

const FeedTotal = () => {
  const { t } = useTranslation("feed");
  const total = useAppSelector(selectFeedTotal);
  const totalToday = useAppSelector(selectFeedTotalToday);

  return (
    <div>
      <p className="text text_type_main-default">{t("headings.total")}</p>
      <p className="text text_type_digits-large mb-10">{total}</p>
      <p className="text text_type_main-default">{t("headings.totalToday")}</p>
      <p className="text text_type_digits-large">{totalToday}</p>
    </div>
  );
};

export default FeedTotal;
