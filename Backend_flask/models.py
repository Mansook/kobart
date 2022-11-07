import numpy
import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration
tokenizer = PreTrainedTokenizerFast.from_pretrained('gogamza/kobart-base-v1')
# model = BartForConditionalGeneration.from_pretrained('./junseo_kobart/kobart_summary_epoch_06')
model = BartForConditionalGeneration.from_pretrained('gogamza/kobart-base-v1')

# text = """
# 블라디미르 푸틴 러시아 대통령이 19일(현지시간) 우크라이나 내 점령지 4개 지역에 계엄령을 선포했다고 타스, 스푸트니크 통신이 보도했다.
# 푸틴 대통령은 이날 영상으로 개최한 러시아 국가안보회의에서 우크라이나 내 헤르손, 자포리자, 도네츠크인민공화국(DPR), 루간스크(우크라이나명 루한스크)인민공화국(LPR) 등 4개 지역을 대상으로 이 같은 조처를 결정했다.
# 크렘린궁 웹사이트에 게재된 관련 포고령에 따르면 해당 지역의 계엄령은 20일부터 적용된다고 스푸트니크 통신은 전했다. 계엄령에 따라 4개 주에서 실시될 구체적 조치에 대해서는 아직 밝혀지지 않았다. 법에 따르면 계엄 선포 지역의 당국자는 평상시보다 훨씬 더 강한 권한을 갖게 되며 사람들의 이동, 모임에 대한 더 엄격한 통제와 검열을 실시할 수 있다.
# 푸틴 대통령은 또 우크라이나와 인접한 러시아의 크라스노다르, 벨고로드, 브랸스크, 보로네시, 쿠르스크 , 로스토프 남부 지역과 크름반도 및 세바스토폴 지역으로 이동을 제한하는 법령도 발표했다. 우크라이나 전쟁과 관련해 각 정부 부처 업무를 조율하는 미하일 미슈스틴 러시아 총리 산하 위원회도 만들기로 했다.
# 푸틴 대통령은 “우리는 러시아의 안보와 안전한 미래를 보장하고 우리 국민을 보호하기 위해 매우 어렵고 큰 과제를 해결하기 위해 노력하고 있다”며 “최전방에 있거나 훈련을 받고 있는 사람들은 우리의 지지를 느끼고 크고 위대한 조국과 단합된 인민이 뒤에 있음을 알아야 한다”고 말했다.
# 러시아는 최근 남부 헤르손과 도네츠크에서 우크라이나군의 영토 수복 공세에 고전하고 있다. 헤르손에서는 6만 명 규모의 주민 대피가 시작됐다.
# """

def summary(text):
    text = text.replace('\n', ' ')

    raw_input_ids = tokenizer.encode(text)
    input_ids = [tokenizer.bos_token_id] + raw_input_ids + [tokenizer.eos_token_id]

    summary_ids = model.generate(torch.tensor([input_ids]),  num_beams=10,  max_length=1000,  eos_token_id=1)
    result = tokenizer.decode(summary_ids.squeeze().tolist(), skip_special_tokens=True)
    return result