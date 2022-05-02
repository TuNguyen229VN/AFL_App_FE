import React, { useState } from "react";
import "./styles/style.css";
const FAQ = () => {
  const [toggleFaq1, setToggleFaq1] = useState(false);
  const [toggleFaq2, setToggleFaq2] = useState(false);
  const [toggleFaq3, setToggleFaq3] = useState(false);
  const [toggleFaq4, setToggleFaq4] = useState(false);
  const [toggleFaq5, setToggleFaq5] = useState(false);
  return (
    <div className="faq" data-aos="fade-up">
      <h3 className="title">Câu hỏi thường gặp</h3>
      <div className="accordion-list" 
      >
        <div
          className="accordion"
          onClick={() => setToggleFaq1((toggleFaq1) => !toggleFaq1)}
        >
          AFL là gì
        </div>
        {toggleFaq1 ? <i className="arrow down"></i> : <i className="arrow right"></i>}
      </div>
      <div className={toggleFaq1 ? "panel" : "panel active"}>
        <p>
          AFL được sáng lập bởi KhoaTuAnhTam .AFL cung cấp các khóa học thực
          chiến lập trình website, UX/UI Design giúp học viên có đủ những kỹ
          năng thực tế cần thiết để đi làm sau khóa học. Ngoài các khóa học, CFD
          còn kết nối cộng đồng các thành viên để học hỏi, chia sẻ, giúp đỡ lẫn
          nhau trong suốt quá trình học và tương lai.
        </p>
      </div>
      <div className="accordion-list">
        <div
          className="accordion"
          onClick={() => setToggleFaq2((toggleFaq2) => !toggleFaq2)}
        >
          Tạo giải đấu như thế nào?
        </div>
        {toggleFaq2 ? <i className="arrow down"></i> : <i className="arrow right"></i>}
      </div>
      <div className={toggleFaq2 ? "panel" : "panel active"}>
        <p>
          Điền đầy đủ thông tin và bấm đăng ký, hệ thống sẽ tạo cho bạn 1 giải
          đấu hoàn hảo
        </p>
      </div>
      <div className="accordion-list">
        <div
          className="accordion"
          onClick={() => setToggleFaq3((toggleFaq3) => !toggleFaq3)}
        >
          Tạo đội bóng như thế nào
        </div>
        {toggleFaq3 ? <i className="arrow down"></i> : <i className="arrow right"></i>}
      </div>
      <div className={toggleFaq3 ? "panel" : "panel active"}>
        <p>
          Điền đầy đủ thông tin và bấm đăng ký, hệ thống sẽ tạo cho bạn 1 giải
          đấu hoàn hảo
        </p>
      </div>
      <div className="accordion-list">
        <div
          className="accordion"
          onClick={() => setToggleFaq4((toggleFaq4) => !toggleFaq4)}
        >
          Làm cách nào mọi người biết và sử dụng hệ thống AFL
        </div>
        {toggleFaq4 ? <i className="arrow down"></i> : <i className="arrow right"></i>}
      </div>
      <div className={toggleFaq4 ? "panel" : "panel active"}>
        <p>
          Không những vậy, AFL còn là nơi lan truyền thông tin một cách nhanh
          chóng. Nếu như bạn đang gặp khó khăn và cần sự giúp đỡ, sẽ có rất
          nhiều cánh tay giúp bạn chỉ với một lượt chia sẻ. Hay trong các tình
          huống trao đổi, học hỏi giao lưu lẫn nhau, bạn sẽ tiếp thu được nhiều
          kiến thức bổ ích nếu như có mối quan hệ rộng lớn.
        </p>
      </div>
      <div className="accordion-list">
        <div
          className="accordion"
          onClick={() => setToggleFaq5((toggleFaq5) => !toggleFaq5)}
        >
          Hệ thống có thu phí từ người dùng không?
        </div>
        {toggleFaq5 ? <i className="arrow down"></i> : <i className="arrow right"></i>}
      </div>
      <div className={toggleFaq5 ? "panel" : "panel active"}>
        <p>
          Thu phí không dừng là cách giúp các xe giảm thời gian chờ đợi khi qua
          trạm, bằng cách dán một thẻ nhỏ lên kính lái hoặc đèn xe để máy đọc
          khi qua trạm, từ đó trừ tiền trong tài khoản mà không cần dừng chờ.
          Tuy tiện lợi nhưng hình thức này còn mới và gặp không ít lỗi trong quá
          trình sử dụng. Sau đây là những lưu ý chủ xe cần biết trước khi dán
          thẻ thu phí không dừng.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
