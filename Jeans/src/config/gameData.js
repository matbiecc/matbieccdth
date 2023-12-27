const taixiu = [
    {
        name: 1,
        icon: '<:xx1:947057975648997436>',
    },
    {
        name: 2,
        icon: '<:xx2:947058152757661746>',
    },
    {
        name: 3,
        icon: '<:xx3:947058116397260800>',
    },
    {
        name: 4,
        icon: '<:xx4:947058290364383253>',
    },
    {
        name: 5,
        icon: '<:xx5:947058333532184616>',
    },
    {
        name: 6,
        icon: '<:xx6:947058366860128288>',
    },
];
const baucua = [
    {
        name: 'Tôm',
        icon: '<:EbiTom:1050325648478060555>',
    },
    {
        name: 'Cá',
        icon: '<:EbiCa:1050325713665929247>',
    },
    {
        name: 'Bầu',
        icon: '<:EbiBau:1050325776274309161>',
    },
    {
        name: 'Cua',
        icon: '<:EbiCua:1050325841256661002>',
    },
    {
        name: 'Nai',
        icon: '<:EbiNai:1050325945287974923>',
    },
    {
        name: 'Gà',
        icon: '<:EbiGa:1050325995317645312>',
    },
];
dovui = [
    {
        question:
            '1 người đi vào rạp chiếu phim gặp 1 con hổ chết, hỏi tại sao người đó quay về?',
        options: {
            a: 'Sợ hãi khi nhìn thấy xác con hổ',
            b: 'Mất vé',
            c: 'Quên đồ ở nhà',
            d: 'Hết chỗ',
        },
        answer: 'd',
    },
    {
        question:
            'Một cậu bé thấy ngoài cổng làng có đám đông liền chạy lại xem, hóa ra có 2 người đang thách đố nhau, mỗi người nói ra 1 câu, nếu người kia không tin thì sẽ phải đưa người nói 5 đồng. Trong 2 người thì có 1 người rất thật thà nên bị thua còn kẻ vô lại kia lại thắng cuộc. Cậu bé thấy thế liền vào chơi hộ người thật thà. Theo bạn, cậu bé chỉ nói duy nhất câu gì?',
        options: {
            a: 'Tôi là người thật thà.',
            b: 'Anh nợ tôi một triệu đồng.',
            c: 'Tôi rất tỉnh và đẹp trai.',
            d: 'Ông xấu quắc!',
        },
        answer: 'b',
    },
    {
        question:
            'Một người bạn mượn bạn một món đồ nhỏ, nhưng có giá trị tinh thần lớn (ví dụ một cuốn sách do một người bạn ở nước ngoài tặng). Sau ít lâu, bạn đòi lại món đồ đó nhưng mãi mà bạn của bạn vẫn chưa đem trả.',
        options: {
            a: 'Bạn nói với người bạn ấy rằng món đồ đó rất quan trọng và tại sao bạn muốn lấy lại, và đề nghị bạn ấy phải đem trả ngay.',
            b: 'Chấm hết tình bạn. Bạn không cần một người bạn không biết tôn trọng bạn và những cảm xúc của bạn.',
            c: 'Bạn làm mặt lạnh cho đến khi người bạn kia trả lại món đồ.',
            d: 'Bạn bỏ qua. Tình bạn quan trọng hơn những món đồ vật chất.',
        },
        answer: 'a',
    },
    {
        question:
            '1/2 của 2/3 của 3/4 của 4/5 của 5/6 của 6/7 của 7/8 của 8/9 của 9/10 của 1.000 là bao nhiêu?',
        options: { a: '0', b: '1', c: '10', d: '100' },
        answer: 'd',
    },
    {
        question:
            "Nếu 'Khối lập phương' đi với 'Hình vuông, 'Hình vuông' đi với ...?",
        options: {
            a: 'Đường thẳng',
            b: 'Máy bay',
            c: 'Diện tích',
            d: 'Góc',
        },
        answer: 'a',
    },
    {
        question:
            'Một người cho nước chảy vào bể chứa. Cứ mỗi phút, lượng nước trong bể lại tăng gấp đôi. Nước chảy trong một giờ thì đầy bể. Vậy nước chiếm nửa bể vào phút thứ mấy?',
        options: {
            a: 'Phút 29',
            b: 'Phút 39',
            c: 'Phút 49',
            d: 'Phút 59',
        },
        answer: 'd',
    },
    {
        question:
            'Cụm từ nào trong môn vật lý, gồm 3 từ, và đặc biệt là 100% giảng viên vật lý không dám viết tắt chúng. 3 từ đó là gì?',
        options: {
            a: 'Suất điện động',
            b: 'Hiệu điện thế',
            c: 'Định luật ôm',
            d: 'Cảm ứng từ',
        },
        answer: 'd',
    },
    {
        question:
            'Bạn đang đi trong sân trường thì bị trượt chân, suýt nữa thì ngã dập mặt.',
        options: {
            a: 'Bạn đứng lên, cười phì, và đi tiếp.',
            b: 'Bạn ngó quanh và lườm những người đang nhìn bạn.',
            c: 'Bạn đỏ mặt vì ngượng, cúi gằm mặt, đi tiếp và hy vọng không ai để ý.',
            d: 'Bạn cáu điên và thầm nguyền rủa.',
        },
        answer: 'a',
    },
    {
        question: 'Tên thường gọi của Sodium Chloride là gì?',
        options: {
            a: 'Muối',
            b: 'Giấm',
            c: 'Đường',
            d: 'Chất tẩy trắng',
        },
        answer: 'a',
    },
    {
        question: "Ch'Amnesia' đi với 'Memory' thì 'Paralysis' đi với...?",
        options: {
            a: 'Disability',
            b: 'Aimpairment',
            c: 'Gun',
            d: 'Limbs',
        },
        answer: 'b',
    },
    {
        question:
            'Đứa em bạn cực kỳ bừa bãi, luôn làm lộn xộn phòng chung của hai đứa, và điều đó ngày càng làm bạn khó chịu.',
        options: {
            a: 'Bạn doạ tống nó ra ở phòng khách nếu nó không chịu thay đổi.',
            b: 'Bạn quyết định sống chung với lũ! Dù gì thì chính bạn cũng có những thói quen chưa tốt kia mà.',
            c: 'Bạn nói rõ ràng cho nó nghe tại sao thói quen của nó làm bạn không thể chấp nhận được, và nó cần phải sửa.',
            d: 'Bạn cố tìm cách làm bẽ mặt nó để nó phải thay đổi.',
        },
        answer: 'c',
    },
    {
        question: 'Có bao nhiêu chấm trên hai con xúc xắc?',
        options: { a: '30', b: '36', c: '38', d: '42' },
        answer: 'd',
    },
    {
        question: 'Ai là người đầu tiên phát hiện Penicillin?',
        options: {
            a: 'Marie Curie',
            b: 'Luis Pasteur',
            c: 'Alexander Fleming',
            d: 'Edward jenner',
        },
        answer: 'a',
    },
    {
        question: 'Có cách nào xếp 5 que diêm thành 11 hình tam giác không?',
        options: {
            a: 'Xếp được',
            b: 'Không xếp được',
            c: 'Xếp được có 1 hình',
            d: 'Bẻ nhỏ que diêm ra',
        },
        answer: 'a',
    },
    {
        question:
            'Tưởng tượng nhé, nếu bạn đến buổi tiệc, bạn đứng nói chuyện với một người khác phái và rồi thấy rằng người đó có vẻ không được thoải mái.',
        options: {
            a: 'Bạn cứ nghĩ mãi là hẳn phải có vấn đề gì đó với chính mình.',
            b: 'Bạn cố hỏi chuyện để hiểu thêm về bạn ấy.',
            c: 'Bạn kết luận rằng bạn ấy không có hứng thú, nên bạn bỏ đi nói chuyện với người khác.',
            d: 'Bạn quyết định rằng lần sau sẽ rủ bạn ấy tham gia một hoạt động gì đó mà bạn ấy thích, dù bạn không thích cũng được',
        },
        answer: 'b',
    },
    {
        question: 'Ném cái gì xuống biển sẽ không bao giờ tìm thấy??',
        options: {
            a: 'Cây kim',
            b: 'Hạt cát',
            c: 'tinh trùng',
            d: 'Panadol extra',
        },
        answer: 'd',
    },
    {
        question:
            'Bạn thân của bạn đã có người yêu, và lại... mới chia tay. Và bạn ấy rất buồn',
        options: {
            a: 'Bạn cũng bắt đầu lo lắng rằng sau này mình có thể cũng gặp những chuyện trục trặc như thế và nghĩ rằng mình sẽ... không dám yêu đương gì hết.',
            b: 'Bạn nói xấu người kia và bảo với bạn mình rằng thà sống một mình còn hơn thích một người như thế.',
            c: 'Bạn thẳng thắn hỏi bạn mình rằng bạn có thể làm gì để giúp đỡ bạn ấy vượt qua.',
            d: 'Bạn rủ bạn ấy đi chơi, ăn uống um xùm để bạn ấy quên bớt đi.',
        },
        answer: 'c',
    },
    {
        question:
            'Bạn tìm được một học bổng du học rất lớn, nhưng để giành được nó thì bạn cũng phải làm một bài luận rất khó',
        options: {
            a: 'Bạn rất lo lắng, và hy vọng sự lo lắng sẽ khiến mình làm cẩn thận hơn.',
            b: 'Bạn để nó sang một bên, lúc nào tâm trạng thoải mái thì làm.',
            c: 'Bạn dành cả tuần để lên kế hoạch làm bài luận, viết ra cẩn thận từng chi tiết và lặng lẽ không nói với ai.',
            d: 'Bạn hít thở sâu, suy nghĩ kỹ để phác thảo ý tưởng trong đầu, ghi ra giấy, bàn bạc với một vài người mà bạn tin tưởng, rồi mới làm',
        },
        answer: 'd',
    },
    {
        question: 'Người đàn ông duy nhất trên thế giới có sữa là ai?',
        options: {
            a: 'ông thọ',
            b: 'ông tổ',
            c: 'ông già',
            d: 'chị ông nâu nâu',
        },
        answer: 'd',
    },
    {
        question:
            '1 ông tiên có cái bàn không méo và 1 con mèo, bà tiên hàng xóm muốn mua con mèo đó, hỏi ông có bán không?',
        options: {
            a: 'Không bán',
            b: 'Tùy hứng',
            c: 'Bán luôn',
            d: 'Không quan tâm',
        },
        answer: 'a',
    },
    {
        question: 'Chọn từ khác nhất so với các từ còn lại?',
        options: { a: 'Tím', b: 'Xanh Lá', c: 'Xanh Da Trời', d: 'Nâu' },
        answer: 'a',
    },
    {
        question:
            'Có 1 ông đi săn, ổng đi vào 3 cái hang. Hang 1 ông ấy gặp một con ma, hang 2 ông gặp trái cà, hang 3 ông gặp một con rồng. Hỏi hang thứ tư ông gặp con gì?',
        options: {
            a: 'Cương thi',
            b: 'Ma cà tưng',
            c: 'ai biết',
            d: 'Ma cà rồng',
        },
        answer: 'd',
    },
    {
        question: '1 giọt nước cộng 1 giọt nước bằng mấy giọt nước?',
        options: { a: '4', b: '3', c: '2', d: '1' },
        answer: 'd',
    },
    {
        question:
            'Vì một hiểu lầm, đứa bạn thân từ hồi mẫu giáo bỗng giận bạn và không thèm chơi với bạn nữa. Bạn rất buồn và:',
        options: {
            a: 'Ngồi nhà ủ rũ.',
            b: 'Tìm những cách giải toả tích cực, như tập thể thao chẳng hạn, để khi nào bạn ấy đỡ giận thì sẽ nói chuyện bình tĩnh sau.',
            c: 'Tìm ngay một nhóm bạn mới để chơi',
            d: 'Tìm thật nhiều việc để làm, để khỏi phải nghĩ ngợi linh tinh.',
        },
        answer: 'b',
    },
    {
        question: "Nếu 'Peace' đi với 'Chaos', 'Creation' đi với...?",
        options: {
            a: 'disorder',
            b: 'habor',
            c: 'energy',
            d: 'demolition',
        },
        answer: 'a',
    },
    {
        question: 'Xe bạn bị hư giữa đường, bạn:',
        options: {
            a: 'Đá cái xe, cầu trời cho xe chạy được.',
            b: 'Khóa xe lại và đi kiếm người sửa giùm',
            c: 'Hờn dỗi cho đến khi có ai đó chạy ngang qua.',
            d: 'Đi ngủ',
        },
        answer: 'b',
    },
    {
        question: 'Nằm giữa Thái Bình Dương là gì?',
        options: { a: 'Nước', b: 'Cá', c: 'Bình', d: 'Ai biết' },
        answer: 'c',
    },
    {
        question:
            '3 con gà đẻ 3 quả trứng trong 3 ngày. Vậy trong 12 ngày, 12 con gà đẻ được bao nhiêu quả trứng?',
        options: { a: '42', b: '44', c: '46', d: '48' },
        answer: 'd',
    },
    {
        question:
            'Ở Việt Nam, một thằng mù và ba thằng điếc đi ăn phở, mỗi người ăn một tô. Mỗi tô phở là 10 ngàn đồng, hỏi ăn xong họ phải trả bao nhiêu tiền?',
        options: {
            a: '20 ngàn đồng',
            b: '10 ngàn đồng',
            c: '30 ngàn đồng',
            d: 'Free',
        },
        answer: 'a',
    },
    {
        question: 'Who always drives his customers away?',
        options: {
            a: 'A teacher',
            b: 'A doctor',
            c: 'Flight engineer',
            d: 'A taxi-driver',
        },
        answer: 'd',
    },
    {
        question: 'Cây gì càng trông càng thấy thấp',
        options: {
            a: 'Cây nến',
            b: 'Cây cỏ',
            c: 'Cây cột điện',
            d: 'Cây cau',
        },
        answer: 'a',
    },
    {
        question: 'Loại nước giải khát nào chứa sắt và canxi?',
        options: { a: 'Cafe', b: 'Coca', c: 'Pepsi', d: '7up' },
        answer: 'a',
    },
    {
        question:
            'Có 2 người bạn 1 mù, 1 câm đi shopping. Câm mua cái nón thì lấy tay chỉ lên đầu và gõ gõ mấy cái còn Mù muốn mua kem đánh răng thì làm sao?',
        options: {
            a: 'Nói: Tôi muốn mua kem đánh răng',
            b: 'Chỉ vào hộp kem đánh răng',
            c: 'Làm động tác đánh răng',
        },
        answer: 'a',
    },
    {
        question: 'Chứng minh con gái = con dê',
        options: {
            a: 'Con gái>thần tiên>tiền thân>trước khỉ>Mùi>con dê',
            b: '2015 = Năm dê',
            c: 'Dê sẵn rồi không cần chứng minh',
            d: 'Không chứng minh được',
        },
        answer: 'a',
    },
    {
        question:
            'Cũng trong một cuộc đua, bạn vừa chạy qua người cuối cùng. Vậy bạn đang ở vị trí nào?',
        options: { a: 'Cuối cùng', b: 'Thứ năm', c: 'Thứ nhất' },
        answer: 'a',
    },
    {
        question:
            '2 người một lớn, một bé đi lên đỉnh một quả núi. Người bé là con của người lớn, nhưng người lớn lại không phải cha của người bé, hỏi người lớn là ai?',
        options: {
            a: 'Mẹ',
            b: 'Cha giượng',
            c: 'Ông hàng xóm',
            d: 'Chú',
        },
        answer: 'a',
    },
    {
        question: 'Con gì mang được miếng gỗ lớn nhưng ko mang được hòn sỏi?',
        options: {
            a: 'Cong sông',
            b: 'Con tàu',
            c: 'Con cá',
            d: 'Con đường',
        },
        answer: 'a',
    },
    {
        question:
            "Có bao nhiêu chữ C trong câu sau đây: 'Cơm, canh, cháo gì tớ cũng thích ăn!'",
        options: { a: '1', b: '2', c: '3', d: '4' },
        answer: 'a',
    },
    {
        question: 'Con gì không gáy ò ó o mà người ta vẫn gọi là gà?',
        options: { a: 'Gà mái', b: 'Gà đồi', c: 'Gà tây', d: 'Gà trắng' },
        answer: 'a',
    },
    {
        question: 'Có cổ nhưng không có miệng là gì?',
        options: {
            a: 'Cái áo',
            b: 'Cái quần',
            c: 'Cái bút',
            d: 'Cái khẩu trang',
        },
        answer: 'a',
    },
    {
        question: 'Trên nhấp dưới giật là đang làm gì?',
        options: { a: 'Câu cá', b: 'Chống đẩy', c: 'Đu xà' },
        answer: 'a',
    },
    {
        question:
            'Tôi đi chu du khắp nơi trên thế giới mà tôi vẫn ở nguyên một chỗ. Vậy tôi là ai?',
        options: {
            a: 'Cái tem',
            b: 'Máy bay',
            c: 'Cái vali',
            d: 'Con chim',
        },
        answer: 'a',
    },
    {
        question: 'Những loài thú nào sau đây ăn cơm?',
        options: { a: 'Sư tử', b: 'Cọp', c: 'Voi', d: 'Hà mã' },
        answer: 'a',
    },
    {
        question: 'Cơ quan quan trọng nhất của phụ nữ là gì ?',
        options: {
            a: 'Hội Liên Hiệp Phụ Nữ',
            b: 'Môi',
            c: 'Vòng eo',
            d: 'Bờ vai',
        },
        answer: 'a',
    },
    {
        question:
            'Khi Ronaldo thực hiện quả đá phạt đền, anh ta sẽ sút vào đâu?',
        options: {
            a: 'Trái bóng',
            b: 'Góc trái',
            c: 'Góc phải',
            d: 'Thủ môn',
        },
        answer: 'a',
    },
    {
        question: 'Người đàn ông duy nhất trên thế giới có…sữa là ai?',
        options: { a: 'Ông thọ', b: 'Ông táo', c: 'Tôn ngộ không' },
        answer: 'a',
    },
    {
        question: 'Ba thằng Què đi trước 1 thằng què hỏi có mấy thằng què',
        options: { a: '1', b: '3', c: '4', d: '2' },
        answer: 'a',
    },
    {
        question:
            'Tôi có 4 cái chân, 1 cái lưng, nhưng không có cơ thể. Tôi là ai?',
        options: {
            a: 'Cái ghế',
            b: 'Cái bàn',
            c: 'Con rùa',
            d: 'Con ngựa',
        },
        answer: 'a',
    },
    {
        question:
            'Có 1 cô gái người ta thường gọi là tam giác , hỏi cô gái đó tên gì?',
        options: { a: 'Thanh kiều', b: 'Thúy kiều', c: 'Tố vân' },
        answer: 'a',
    },
    {
        question:
            'Con gì mang được miếng gỗ lớn nhưng không mang được hòn sỏi?',
        options: {
            a: 'Con sông',
            b: 'Con voi',
            c: 'Con kiến',
            d: 'Con cua',
        },
        answer: 'a',
    },
    {
        question:
            '2 con vịt đi trước 2 con vịt, 2 con vịt đi sau 2 con vịt, 2 con vịt đi giữa 2 con vịt. Hỏi có mấy con vịt?',
        options: { a: '4', b: '2', c: '1', d: '3' },
        answer: 'a',
    },
    {
        question: 'Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?',
        options: {
            a: 'Bắp ngô',
            b: 'Củ khoai',
            c: 'Cây mía',
            d: 'Xúc xích',
        },
        answer: 'a',
    },
    {
        question:
            'Một ly thuỷ tinh đựng đầy nước, làm thế nào để lấy nước dưới đáy ly mà không đổ nước ra ngoài ?',
        options: {
            a: 'Ống hút',
            b: 'Dùng thìa',
            c: 'Dùng miệng',
            d: 'Gọi chủ quán',
        },
        answer: 'a',
    },
    {
        question:
            'Có 3 thằng lùn xếp hàng dọc đi vào hang. Thằng đi sau cầm 1 cái xô, thằng đi giữa cầm 1 cái xẻng, hỏi thằng đi trước cầm gì?',
        options: { a: 'Cầm đầu', b: 'Cầm Bom', c: 'Cầm điện thoại' },
        answer: 'a',
    },
    {
        question:
            'Câu chữ nào mà những người vui sướng khi nhìn thấy nó sẽ trở nên buồn bã và ngược lại, những người buồn bã u sầu khi thấy nó sẽ trở nên vui vẻ hơn.',
        options: {
            a: 'Điều đó rồi cũg qua đi.',
            b: 'Yên tâm đi mai có lương rồi',
            c: 'Tháng này được thưởng thêm rồi!',
        },
        answer: 'a',
    },
    {
        question: 'Cái gì khi dùng thì quăng đi, không dùng lại lấy lại',
        options: {
            a: 'Cái mỏ neo',
            b: 'Cái bút',
            c: 'Cái ghế',
            d: 'Cái cuốc',
        },
        answer: 'a',
    },
    {
        question: '4 : 3 = bao nhiêu',
        options: { a: '2', b: '1,5', c: '0,5', d: '1' },
        answer: 'a',
    },
    {
        question:
            'Con chó đen người ta gọi là con chó mực. Con chó vàng, người ta gọi là con chó phèn. Con chó sanh người ta gọi là con chó đẻ. Vậy con chó đỏ, ng ta gọi là con chó gì?',
        options: { a: 'Chó đỏ', b: 'Chó dại', c: 'Chó đực' },
        answer: 'a',
    },
    {
        question:
            'Tôi có 4 cái chân, 1 cái lưng, nhưng không có cơ thể. Tôi là ai?',
        options: {
            a: 'Cái ghế',
            b: 'Siêu nhân',
            c: 'Người ngoài hành tinh',
            d: 'Mặt trời',
        },
        answer: 'a',
    },
    {
        question: 'Đố bạn chuột nào đi bằng 2 chân?',
        options: {
            a: 'Mickey',
            b: 'Chuột cống',
            c: 'Chuột trù',
            d: 'Chuột đồng',
        },
        answer: 'a',
    },
    {
        question:
            'Nơi nào có đường xá, nhưng không có xe cộ; có nhà ở, nhưng không có người; có siêu thị, công ty... nhưng không có hàng hóa... Đó là nơi nào??!!',
        options: {
            a: 'Ở bản đồ',
            b: 'Ở Việt nam',
            c: 'Hải phòng',
            d: 'Ở trái đất',
        },
        answer: 'a',
    },
    {
        question:
            'Có 1 con trâu. Đầu nó thì hướng về hướng mặt trời mọc, nó quay trái 2 vòng sau đó quay ngược lại sau đó lại quay phải hay vòng hỏi cái đuôi của nó chỉ hướng nào?',
        options: {
            a: 'Xuống đất',
            b: 'Lên trời',
            c: 'Sang phải',
            d: 'Sang Trái',
        },
        answer: 'a',
    },
    {
        question: 'Nắng ba năm ta chưa hề bỏ bạn. Là cái gì?',
        options: {
            a: 'Cái bóng',
            b: 'Cái áo mưa',
            c: 'Cái ô',
            d: 'Đôi dép',
        },
        answer: 'a',
    },
    {
        question:
            'Bà đó bả chết bả bay lên trời.Hỏi bà ấy chết năm bao nhiêu tuổi?',
        options: { a: '73', b: '93', c: '83' },
        answer: 'a',
    },
    {
        question:
            'Một đàn chim 15 con đậu trên cây. Người thợ săn giơ súng bắn 5 phát, hỏi trên cây còn mấy con?',
        options: { a: '0', b: '5', c: '10', d: '15' },
        answer: 'a',
    },
    {
        question:
            'Có 1 người muốn làm quen với 1 cô gái, liền chạy lại hỏi tên,cô gái nói: Anh hãy đếm xem trong giỏ có bao nhiêu cây bắp thì khắc biết tên tôi.Người có đếm được 12 cây bắp,hỏi cô gái đó tên gì?',
        options: { a: 'Tố Nga', b: 'Thúy kiều', c: 'Bắp Bắp', d: 'Thúy' },
        answer: 'a',
    },
    {
        question: 'Vua gọi hoàng hậu bằng gì?',
        options: { a: 'Miệng', b: 'Ái phi', c: 'Thái hậu', d: 'Nàng' },
        answer: 'a',
    },
    {
        question:
            'Có 2 con cua: 1 con cua đen và 1 con cua đỏ. Hỏi con nào chạy nhanh hơn?',
        options: { a: 'Cua đen', b: 'Cua đỏ' },
        answer: 'a',
    },
    {
        question:
            'Nếu chỉ có một que diêm, trong một ngày mùa đông giá rét. Bước vào căn phòng có một cây đèn, một bếp dầu và một bếp củi, bạn thắp gì trước tiên?',
        options: {
            a: 'Que diêm',
            b: 'Cây đèn',
            c: 'Bếp dầu',
            d: 'Bếp củi',
        },
        answer: 'a',
    },
    {
        question:
            'Bạn đang ở trong một cuộc đua và bạn vừa vượt qua người thứ nhì . Vậy bây giờ bạn đang ở vị trí nào trong đoàn đua ấy?',
        options: { a: 'Thứ nhì', b: 'Thứ nhất', c: 'Thứ ba' },
        answer: 'a',
    },
    {
        question:
            'Hai người đào trong hai giờ thì được một cái hố. Hỏi nếu một người đào trong một giờ thì được mấy cái hố',
        options: {
            a: 'Một cái hố',
            b: 'Hai cái hố',
            c: 'Ba cái hố',
            d: 'Không được cái hố nào',
        },
        answer: 'a',
    },
    {
        question:
            'Có 2 người mặt mũi giống nhau, ngày tháng năm sinh và giờ sinh cũng giống nhau. Nhưng vì sao lại không phải là sinh đôi?',
        options: {
            a: 'Vì họ sinh 3',
            b: 'Vì họ khác bố',
            c: 'Vì họ khác mẹ',
        },
        answer: 'a',
    },
    {
        question:
            'Có 1 người không may bị té xuống hồ sâu, quần áo đều ướt đẫm hết nhưng không thấy tóc ướt tí nào. Hỏi vì sao?',
        options: {
            a: 'Người này không có tóc',
            b: 'Người này đội mũ',
            c: 'Người này là ma',
        },
        answer: 'a',
    },
    {
        question: 'Ở Việt Nam, rồng bay ở đâu?',
        options: { a: 'Thăng long', b: 'Sân vận động', c: 'Hồ gươm' },
        answer: 'a',
    },
    {
        question: 'Con đường dài nhất là đường nào?',
        options: {
            a: 'Đường đời',
            b: 'Đường Quốc lộ',
            c: 'Đường Trường Sơn',
            d: 'Đường biên giới',
        },
        answer: 'a',
    },
    {
        question: 'Cái gì càng kéo càng ngắn',
        options: {
            a: 'Điếu thuốc lá',
            b: 'Ống hút',
            c: 'Cái tẩu',
            d: 'Cái quần',
        },
        answer: 'a',
    },
    {
        question: 'Tại sao con chó không cắn được đuôi của mình?',
        options: {
            a: 'Vì đuôi nó không đủ dài',
            b: 'Vì nó chưa học Yoga',
            c: 'Vì cổ nó quá ngắn',
        },
        answer: 'a',
    },
    {
        question:
            'Có hai bình rộng miệng đựng đầy nước. Làm sao để cho tất cả nước vào trong một cái chậu mà vẫn biết nước nào của bình nào(không được cho cả bình hay bất kỳ dụng cụ đựng nước nào vào chậu) ?',
        options: {
            a: 'Cho đông thành đá',
            b: 'Ngăn đôi cái chậu',
            c: 'Thêm phẩm nhuộm',
        },
        answer: 'a',
    },
    {
        question:
            'Một gia đình gồm bố mẹ và 6 người con trai, mỗi người con trai chỉ có một cô em gái. Hỏi gia đình đó có bao nhiêu người',
        options: { a: '9', b: '7', c: '8', d: '10' },
        answer: 'a',
    },
    {
        question:
            'Một phụ nữ đang mua đồ tại tiệm ngũ kim. Người bán hàng chào giá: “Giá của một là mười hai xu, giá của bốn mươi tư là hai mươi tư xu, và giá của một trăm mười bốn là ba mươi sáu xu.”! Cô ta muốn mua gì vậy ta?',
        options: {
            a: 'Mua số nhà',
            b: 'Mua số điện thoại',
            c: 'Mua sổ sổ',
            d: 'Mua bánh mỳ',
        },
        answer: 'a',
    },
    {
        question: '30 chia 1/2, và cộng thêm 10, bằng bao nhiêu?',
        options: { a: '70', b: '25', c: '30', d: '60' },
        answer: 'a',
    },
    {
        question:
            'Có 1 con rết 100 chân dang đi dạo mát bổng nhiên đụng phải một bãi phân trâu. Rết ngậm ngùi bước tiếp. Hỏi khi đi qua bãi phân châu rết còn mấy chân ?',
        options: { a: '98', b: '100', c: '102', d: '99' },
        answer: 'a',
    },
    {
        question:
            'Cái gì có kích thước bằng con voi nhưng chẳng nặng gram nào cả?',
        options: {
            a: 'Bóng con voi',
            b: 'Bố con voi',
            c: 'Mẹ con voi',
            d: 'Con voi',
        },
        answer: 'a',
    },
    {
        question: 'Cái gì ở giữa bầu trời và trái đất?',
        options: { a: 'Và', b: 'Cái cây', c: 'Ngôi nhà', d: 'Con người' },
        answer: 'a',
    },
    {
        question:
            'Hai con chó đang lang thang ở công viên. Con chó trắng tên Đen, con chó đen tên Trắng. Nam thấy chúng dễ thương, liền thẩy trái banh ra xa rồi ra lệnh “Đen, đi lượm trái banh”… Đố bạn con chó nào sẽ đi lượm?',
        options: {
            a: 'Không con nào đi',
            b: 'Cả hai con đi',
            c: 'Chó đen',
            d: 'Chó trắng',
        },
        answer: 'a',
    },
    {
        question: 'Sở thú bị cháy, con gì chạy ra đầu tiên?',
        options: {
            a: 'Con người',
            b: 'Con hổ',
            c: 'Con voi',
            d: 'Con khỉ',
        },
        answer: 'a',
    },
    {
        question:
            'Tôi có cả một hàm răng nhưng không có cái miệng nào cả? Tôi là ai?',
        options: {
            a: 'Cái cưa',
            b: 'Cái hang',
            c: 'Cái dao',
            d: 'Cái thang',
        },
        answer: 'a',
    },
    {
        question:
            'Cái gì trong trắng ngoài xanh. Trồng đậu, trồng hành rồi thả heo vào',
        options: {
            a: 'Bánh chưng',
            b: 'Bánh mì',
            c: 'Bánh đậu xanh',
            d: 'Bánh cáy',
        },
        answer: 'a',
    },
    {
        question:
            'Bên trái đường có một căn nhà xanh, bên phải đường có một căn nhà đỏ. Vậy, nhà Trắng ở đâu ?',
        options: { a: 'Ở Mỹ', b: 'Ở phía sau', c: 'Ở trên trời!' },
        answer: 'a',
    },
    {
        question: 'Người da trắng tắm biển đen thì họ sẽ bị gì?',
        options: { a: 'Bị ướt', b: 'Bị đen', c: 'Bị nổi', d: 'Bị chìm' },
        answer: 'a',
    },
    {
        question: 'Toà nhà lớn nhất thế giới?',
        options: {
            a: 'Nhà nước',
            b: 'Nhà trắng',
            c: 'Nhà thờ',
            d: 'Toàn nhà CMC',
        },
        answer: 'a',
    },
    {
        question: 'Con mèo nào cực kỳ sợ chuột?',
        options: {
            a: 'Doremon',
            b: 'Mèo tam thể',
            c: 'Mèo con',
            d: 'Mèo già',
        },
        answer: 'a',
    },
    {
        question: 'Câu hỏi nào mà không ai có thể trả lời “Vâng”?',
        options: {
            a: 'Mày chết rùi hả?',
            b: 'Mày thích gì?',
            c: 'Mày thích chết không',
            d: 'Mày cho tao vay 500k nhé!',
        },
        answer: 'a',
    },
    {
        question:
            'Nếu bạn nhìn thấy con chim đang đậu trên nhánh cây, làm sao để lấy nhánh cây mà không làm động con chim?',
        options: {
            a: 'Đợi con chim bay đi',
            b: 'Bắn chết con chim',
            c: 'Lấy nhánh cây khác',
        },
        answer: 'a',
    },
    {
        question:
            'Hãy đối lại một câu trái nghĩa với câu này:”đất lành chim đậu”?',
        options: {
            a: 'Đất giữ chim đi',
            b: 'Đất không lành chim không đậu',
            c: 'Chim đậu đất lành',
        },
        answer: 'a',
    },
    {
        question: 'Tôi luôn mang giày đi ngủ. Tôi là ai?',
        options: {
            a: 'Con ngựa',
            b: 'Con người',
            c: 'Con mèo',
            d: 'Cái bít tất',
        },
        answer: 'a',
    },
    {
        question: 'Con gì còn đau khổ hơn hươu cao cổ bị viêm họng?',
        options: {
            a: 'Con rết bị đau chân',
            b: 'Con hổ bị sâu răng',
            c: 'Con chó bị viêm xoang',
            d: 'Con người bị trĩ',
        },
        answer: 'a',
    },
    {
        question: 'Ở Việt Nam, rồng đáp ở đâu?',
        options: { a: 'Hạ long', b: 'Hà nội', c: 'Hải phòng' },
        answer: 'a',
    },
    {
        question: 'Trò gì càng chơi càng ra nước?',
        options: {
            a: 'Chơi cờ',
            b: 'Nghịch nước',
            c: 'Chơi bài',
            d: 'Chơi tại bể bơi',
        },
        answer: 'a',
    },
    {
        question: 'Làm sao để cái cân tự cân chính nó?',
        options: {
            a: 'Lật ngược cái cân lại',
            b: 'Đặt lên cái cân khác',
            c: 'Đặt 2 cái cân lên bàn cân',
            d: 'Không thể làm được',
        },
        answer: 'a',
    },
    {
        question: 'Đố bạn vịt nào đi bằng 2 chân?',
        options: {
            a: 'Vịt nào chẳng đi bằng hai chân',
            b: 'Vịt trời',
            c: 'Vịt cái',
            d: 'Vịt donald',
        },
        answer: 'a',
    },
    {
        question: 'Tháng nào ngắn nhất trong năm?',
        options: {
            a: 'Tháng Ba',
            b: 'Tháng Năm',
            c: 'Tháng Sáu',
            d: 'Tháng 12',
        },
        answer: 'a',
    },
    {
        question: 'Câu hỏi nào mà bạn phải trả lời “có”?',
        options: {
            a: 'Đánh vần từ Có',
            b: 'Tối nay đi chơi không?',
            c: 'Xếp hỏi bạn có muốn tăng lương không?',
        },
        answer: 'a',
    },
    {
        question:
            'Đố bạn khi Beckham thực hiện quả đá phạt đền, anh ta sẽ sút vào đâu?',
        options: {
            a: 'Vào bóng',
            b: 'Vào góc hiểm',
            c: 'Vào lưới',
            d: 'Vào bên trái',
        },
        answer: 'a',
    },
];
let decks = [
    {
        suit: 'clubs',
        emoji: '<:1tep:814776668802514986>',
        value: 1,
    },
    {
        suit: 'clubs',
        emoji: '<:2tep:814776668895576076>',
        value: 2,
    },
    {
        suit: 'clubs',
        emoji: '<:3tep:814776669331259432>',
        value: 3,
    },
    {
        suit: 'clubs',
        emoji: '<:4tep:814776669188390932>',
        value: 4,
    },
    {
        suit: 'clubs',
        emoji: '<:5tep:814776669302816819>',
        value: 5,
    },
    {
        suit: 'clubs',
        emoji: '<:6tep:814776669285122078>',
        value: 6,
    },
    {
        suit: 'clubs',
        emoji: '<:7tep:814776669394173962>',
        value: 7,
    },
    {
        suit: 'clubs',
        emoji: '<:8tep:814776669369139200>',
        value: 8,
    },
    {
        suit: 'clubs',
        emoji: '<:9tep:814776669378183179>',
        value: 9,
    },
    {
        suit: 'clubs',
        emoji: '<:10tep:1050364722198876230>',
        value: 10,
    },
    {
        suit: 'clubs',
        emoji: '<:Jtep:1050361991979597834>',
        value: 10,
    },
    {
        suit: 'clubs',
        emoji: '<:Qtep:1050362007188160612>',
        value: 10,
    },
    {
        suit: 'clubs',
        emoji: '<:Ktep:1050361999860695103>',
        value: 10,
    },

    {
        suit: 'diamonds',
        emoji: '<:atro:814776669377789972>',
        value: 1,
    },
    {
        suit: 'diamonds',
        emoji: '<:2ro:814776668919955467>',
        value: 2,
    },
    {
        suit: 'diamonds',
        emoji: '<:3ro:814776669150642176>',
        value: 3,
    },
    {
        suit: 'diamonds',
        emoji: '<:4ro:814776669247897640>',
        value: 4,
    },
    {
        suit: 'diamonds',
        emoji: '<:5ro:814776669197959188>',
        value: 5,
    },
    {
        suit: 'diamonds',
        emoji: '<:6ro:814776669239640084>',
        value: 6,
    },
    {
        suit: 'diamonds',
        emoji: '<:7ro:814776669130588191>',
        value: 7,
    },
    {
        suit: 'diamonds',
        emoji: '<:8ro:814776669159292959>',
        value: 8,
    },
    {
        suit: 'diamonds',
        emoji: '<:9ro:814776669461020683>',
        value: 9,
    },
    {
        suit: 'diamonds',
        emoji: '<:10ro:1050364720424697856>',
        value: 10,
    },
    {
        suit: 'diamonds',
        emoji: '<:Jro:1050361990171856987>',
        value: 10,
    },
    {
        suit: 'diamonds',
        emoji: '<:Qro:1050362005439139900>',
        value: 10,
    },
    {
        suit: 'diamonds',
        emoji: '<:Kro:1050361998380114021>',
        value: 10,
    },

    {
        suit: 'hearts',
        emoji: '<:1co:814776668870410251>',
        value: 1,
    },
    {
        suit: 'hearts',
        emoji: '<:2co:814776669071212544>',
        value: 2,
    },
    {
        suit: 'hearts',
        emoji: '<:3co:814776669096247336>',
        value: 3,
    },
    {
        suit: 'hearts',
        emoji: '<:4co:814776669319593994>',
        value: 4,
    },
    {
        suit: 'hearts',
        emoji: '<:5co:814776669247504434>',
        value: 5,
    },
    {
        suit: 'hearts',
        emoji: '<:6co:814776669213687858>',
        value: 6,
    },
    {
        suit: 'hearts',
        emoji: '<:7co:814776669369270272>',
        value: 7,
    },
    {
        suit: 'hearts',
        emoji: '<:8co:814776669533241344>',
        value: 8,
    },
    {
        suit: 'hearts',
        emoji: '<:9co:814776669344628737>',
        value: 9,
    },
    {
        suit: 'hearts',
        emoji: '<:10co:1050364718134611968>',
        value: 10,
    },
    {
        suit: 'hearts',
        emoji: '<:Jro:1050361990171856987>',
        value: 10,
    },
    {
        suit: 'hearts',
        emoji: '<:Qco:1050362003744620594>',
        value: 10,
    },
    {
        suit: 'hearts',
        emoji: '<:Kco:1050361996006146118>',
        value: 10,
    },

    {
        suit: 'spades',
        emoji: '<:1bich:814776669071736832>',
        value: 1,
    },
    {
        suit: 'spades',
        emoji: '<:2bich:814776669109747752>',
        value: 2,
    },
    {
        suit: 'spades',
        emoji: '<:3bich:814776669041721344>',
        value: 3,
    },
    {
        suit: 'spades',
        emoji: '<:4bich:814776669192585236>',
        value: 4,
    },
    {
        suit: 'spades',
        emoji: '<:5bich:814776669184852009>',
        value: 5,
    },
    {
        suit: 'spades',
        emoji: '<:6bich:814776669197303868>',
        value: 6,
    },
    {
        suit: 'spades',
        emoji: '<:7bich:814776669625778186>',
        value: 7,
    },
    {
        suit: 'spades',
        emoji: '<:8bich:814776669256548373>',
        value: 8,
    },
    {
        suit: 'spades',
        emoji: '<:9bich:814776669373071370>',
        value: 9,
    },
    {
        suit: 'spades',
        emoji: '<:10bich:1050364716532375632>',
        value: 10,
    },
    {
        suit: 'spades',
        emoji: '<:Jbich:1050361985801400360>',
        value: 10,
    },
    {
        suit: 'spades',
        emoji: '<:Qbich:1050362001999806524>',
        value: 10,
    },
    {
        suit: 'spades',
        emoji: '<:Kbich:1050361993619583026>',
        value: 10,
    },
];

module.exports = {
    taixiu,
    baucua,
    dovui,
    decks,
};
