import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../services/Store";
import { selectFeedOrders } from "../../../services/reducers/WebSocketReducer";
import styles from "./FeedStatuses.module.css";
import { useEffect, useState } from "react";

const FeedStatuses = () => {
  const { t } = useTranslation("feed");
  const orders = useAppSelector(selectFeedOrders);

  const [pending, setPending] = useState<number[][]>([]);
  const [created, setCreated] = useState<number[][]>([]);

  useEffect(() => {
    const newPending: number[] = [];
    const newCreated: number[] = [];

    orders.forEach((order) => {
      switch (order.status) {
        case "pending":
          newPending.push(order.number);
          break;
        case "created":
          newCreated.push(order.number);
          break;
        default:
          break;
      }
    });

    const groupedPending: number[][] = [];
    for (let i = 0; i < newPending.length; i += 10) {
      groupedPending.push(newPending.slice(i, i + 10));
    }
    setPending(groupedPending);

    const groupedCreated: number[][] = [];
    for (let i = 0; i < newCreated.length; i += 10) {
      groupedCreated.push(newCreated.slice(i, i + 10));
    }
    setCreated(groupedCreated);
  }, [orders]);

  return (
    <div className={`mb-10 ${styles.feed_statuses}`}>
      <div className={styles.feed_statuses_column}>
        <h2 className="text text_type_main-default mb-4">
          {t("status.pending")}
        </h2>
        {pending.length > 0 &&
          pending.map((group, index) => (
            <div
              key={`pending${index}`}
              className={styles.feed_statuses_column_numbers}
            >
              {group.map((element, elementIndex) => (
                <span
                  key={elementIndex}
                  className={`text text_type_digits-default ${styles.feed_statuses_column_pending_number}`}
                >
                  {element}
                </span>
              ))}
            </div>
          ))}
      </div>
      <div className={styles.feed_statuses_column}>
        <h2 className="text text_type_main-default mb-4">
          {t("status.created")}
        </h2>
        {created.length > 0 &&
          created.map((group, index) => (
            <div
              key={`created${index}`}
              className={styles.feed_statuses_column_numbers}
            >
              {group.map((element, elementIndex) => (
                <span
                  key={elementIndex}
                  className="text text_type_digits-default"
                >
                  {element}
                </span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedStatuses;
