import { Button, Drawer, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export { KindOfAccount };

function KindOfAccount({ type, isActiveDrawer, handleClickRule }) {
  return (
    <Drawer
      anchor={"right"}
      open={isActiveDrawer[type]}
      onClose={handleClickRule(type, false)}
    >
      <Container
        sx={{
          padding: "20px 20px 100px 20px",
          maxWidth: "100%",
          width: "900px",
        }}
      >
        <TextAccount/>
      </Container>
      <Button
        startIcon={<ArrowBackIosNewIcon style={{fontSize:  '14px'}}/>}
        onClick={handleClickRule(type, false)}
        style={{
          backgroundColor: "rgb(242, 242, 242)",
          width: "100%",
          textAlign: "center",
          color: "black",
          position: "sticky",
          color: 'rgba(0, 0, 0, 0.54)',
          bottom: 0, 
        }}
      >
        <Typography variant="subtitle1" style={{fontSize: '16px', textTransform: 'none'}}>Trở về</Typography>
      </Button>
    </Drawer>
  );
}


const TextAccount = ()=>{
  return <>
     <Typography align="center" variant="h4">
          Cách tạo tài khoản
        </Typography>
        <Typography align="center" variant="h4">
          chương trình Kết Nối Yêu Thương
        </Typography>
        <Typography align="left" variant="h6">
          Quy định về loại tài khoản
        </Typography>
        <Typography align="left" variant="body2">
          Trước khi tạo tài khoản sử dụng trên chương trình, bạn cần đọc và hiểu
          rõ nghĩa vụ, chức năng, quyền lợi của từng loại đối tượng mà bạn sẽ
          đăng ký. Khi tạo tài khoản theo một loại đối tượng, đồng nghĩa với
          việc bạn đồng ý chịu mọi trách nhiệm có liên quan đến quyền hạn mà bạn
          đã đăng ký.
        </Typography>
        <ol>
          <li style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            <Typography align="left" variant="h6">
              Đối tượng <strong>“Cá nhân”</strong>:
            </Typography>
            <ul>
              <li>
                <Typography align="left" variant="body2">
                  Là tài khoản của một hoặc một vài cá nhân có nhu cầu tham gia
                  chương trình với mục đích tìm kiếm sự hỗ trợ từ cộng đồng,
                  hoặc có nhu cầu giúp đỡ, trợ giúp các tổ chức, nhóm thiện
                  nguyện khác trên cộng đồng của chúng tôi.
                </Typography>
              </li>
              <li>
                <Typography align="left" variant="body2">
                  Bạn sẽ bị giới hạn một số quyền liên quan đến nghĩa vụ ảnh
                  hưởng đến cộng đồng. Bạn chỉ có thể hỗ trợ hoặc yêu cầu hỗ trợ
                  ở quy mô nhỏ, dưới 5 người và các bài đăng tin của bạn chỉ
                  được công khai ở các mục hỗ trợ hoặc yêu cầu hỗ trợ tại Cho
                  tặng, Vận chuyển, Công việc, Chỗ ở, Chợ yêu thương.
                </Typography>
              </li>
            </ul>
          </li>
          <li style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            <Typography align="left" variant="h6">
              Đối tượng <strong>“Mạnh thường quân”</strong>:
            </Typography>
            <ul>
              <li>
                <Typography align="left" variant="body2">
                  Là tài khoản của một hoặc một vài cá nhân có nhu cầu tham gia
                  chương trình chỉ với mục đích giúp đỡ, hỗ trợ cộng đồng, các
                  cá nhân khó khăn và liên kết với những mạnh thường quân hoặc
                  tổ chức từ thiện khác.
                </Typography>
              </li>
              <li>
                <Typography align="left" variant="body2">
                  Tin tức được đăng bởi bạn sẽ được cho phép hiển thị tại các
                  mục Bảng tin, Cho tặng, Vận chuyển, Công việc, Chỗ ở, Chợ yêu
                  thương.
                </Typography>
              </li>
            </ul>
          </li>
          <li style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            <Typography align="left" variant="h6">
              Đối tượng <strong>“Tổ chức”</strong>:
            </Typography>
            <ul>
              <li>
                <Typography align="left" variant="body2">
                  Là tài khoản của một tổ chức đã đăng ký chứng nhận hoạt động
                  trong lĩnh vực hỗ trợ cộng đồng. Có giấy phép, người đại
                  diện,... đầy đủ để hoạt động trong lãnh thổ Việt Nam và nước
                  ngoài.
                </Typography>
              </li>
              <li>
                <Typography align="left" variant="body2">
                  Tin tức được đăng bởi bạn sẽ được cho phép hiển thị tại các
                  mục Bảng tin, Cho tặng, Vận chuyển, Công việc, Chỗ ở, Chợ yêu
                  thương.
                </Typography>
              </li>
            </ul>
          </li>
        </ol>
        <Typography align="left" variant="h6">
          Để tạo tài khoản Kết nối yêu thương
        </Typography>
        <ol style={{ marginTop: "0px" }}>
          <li>
            <Typography align="left" variant="body2">
              Truy cập www.weewoo.vn hoặc ứng dụng Kết Nối Yêu Thương
            </Typography>
          </li>
          <li>
            <Typography align="left" variant="body2">
              Nhấn nút Đăng nhập ở góc trái thanh điều hướng của chương trình
            </Typography>
          </li>
          <li>
            <Typography align="left" variant="body2">
              Nhấn chọn Đăng ký tài khoản
            </Typography>
          </li>
          <li>
            <Typography align="left" variant="body2">
              Đăng ký tài khoản: Nhập số điện thoại đăng nhập, mật khẩu, họ
              tên/tên tổ chức, tên người đại diện (nếu có) và email.
            </Typography>
          </li>
          <li>
            <Typography align="left" variant="body2">
              Nhấn vào Xác nhận thông tin, tài khoản của bạn đã được tạo.
            </Typography>
          </li>
        </ol>
        <Typography align="left" variant="h6">
          Nếu bạn gặp sự cố khi tạo tài khoản
        </Typography>
        <Typography align="left" variant="body2">
          Để cho chúng tôi biết về sự cố bạn đang gặp phải khi tạo tài khoản Kết
          nối yêu thương, hãy liên hệ với chúng tôi qua email:{" "}
          <span className="register-link">hotro@weewoo.vn</span>
        </Typography>
        <Typography align="left" variant="h6">
          Nếu bạn gặp sự cố khi đăng nhập
        </Typography>
        <Typography align="left" variant="body2">
          Nếu bạn gặp sự cố với tên đăng nhập hoặc mật khẩu của mình, hãy tìm
          hiểu cách đặt lại mật khẩu hoặc liên hệ với chúng tôi qua email:{" "}
          <span className="register-link">hotro@weewoo.vn</span>
        </Typography>
        <Typography align="left" variant="h6">
          Tại sao bạn được yêu cầu thêm số điện thoại vào tài khoản của mình?
        </Typography>
        <Typography align="left" variant="body2">
          Số điện thoại của bạn được sử dụng để tạo tài khoản và đăng nhập vào
          chương trình Kết nối yêu thương. Mỗi số điện thoại chỉ được tạo một
          tài khoản duy nhất.
        </Typography>
        <Typography align="left" variant="h6">
          Nếu bạn không thể tạo tài khoản bằng số điện thoại của mình
        </Typography>
        <Typography align="left" variant="body2">
          Nếu bạn gặp sự cố khi tạo tài khoản bằng số điện thoại của mình:
        </Typography>
        <ul>
          <li>
            <Typography align="left" variant="body2">
              Nếu bạn thấy thông báo cho biết số điện thoại của bạn không đúng
              định dạng, hãy đảm bảo rằng bạn đã nhập đúng số điện thoại của
              mình.
            </Typography>
          </li>
          <li>
            <Typography align="left" variant="body2">
              Nếu bạn thấy thông báo rằng một tài khoản đã tồn tại với số điện
              thoại của mình, bạn có thể cần đợi một vài ngày để thử thêm tài
              khoản đó vào tài khoản của mình.
            </Typography>
          </li>
          <li>
            <Typography align="left" variant="body2">
              Nếu bạn cố gắng đăng ký một tài khoản Kết nối yêu thương mới bằng
              số điện thoại và mật khẩu giống hoặc tương tự với tài khoản bạn đã
              tạo, bạn sẽ nhận được thông báo “Số điện thoại này đã được đăng
              ký. Vui lòng chọn số điện thoại khác.
            </Typography>
          </li>
        </ul>
        <Typography align="left" variant="body2">
          Nếu bạn đã có tài khoản Kết nối yêu thương với số điện thoại của mình
          nhưng quên mật khẩu:
        </Typography>
        <li>
          <Typography align="left" variant="body2">
            Nếu bạn thấy thông báo cho biết số điện thoại của bạn không đúng
            định dạng, hãy đảm bảo rằng bạn đã nhập đúng số điện thoại của mình.
          </Typography>
        </li>
        <Typography align="left" variant="caption">
          Ngày cập nhật gần nhất: 11/02/2022
        </Typography>
  </>
}