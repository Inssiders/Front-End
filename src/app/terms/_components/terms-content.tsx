"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TermsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams?.get("tab");
  const [tab, setTab] = useState(tabParam || "terms");

  useEffect(() => {
    if (tabParam !== tab) {
      setTab(tabParam || "terms");
    }
    // eslint-disable-next-line
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setTab(value);
    const params = new URLSearchParams(Array.from(searchParams!.entries()));
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="py-12 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <Tabs
          value={tab}
          onValueChange={handleTabChange}
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="w-full mb-8 bg-white border border-gray-200 dark:bg-gray-900/80 dark:border-gray-800 rounded-lg flex gap-2 p-1 shadow-none">
            <TabsTrigger
              value="terms"
              className="flex-1 rounded-md font-medium text-gray-700 dark:text-gray-200 border border-transparent data-[state=active]:border-gray-400 data-[state=active]:bg-gray-100 data-[state=active]:dark:bg-gray-800 data-[state=active]:text-black data-[state=active]:dark:text-white transition-colors"
            >
              이용약관
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="flex-1 rounded-md font-medium text-gray-700 dark:text-gray-200 border border-transparent data-[state=active]:border-gray-400 data-[state=active]:bg-gray-100 data-[state=active]:dark:bg-gray-800 data-[state=active]:text-black data-[state=active]:dark:text-white transition-colors"
            >
              개인정보처리방침
            </TabsTrigger>
            <TabsTrigger
              value="copyright"
              className="flex-1 rounded-md font-medium text-gray-700 dark:text-gray-200 border border-transparent data-[state=active]:border-gray-400 data-[state=active]:bg-gray-100 data-[state=active]:dark:bg-gray-800 data-[state=active]:text-black data-[state=active]:dark:text-white transition-colors"
            >
              저작권 정책
            </TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg rounded-xl bg-white dark:bg-gray-950/90">
              <CardContent className="p-6 md:p-10">
                <TabsContent value="terms" className="mt-0">
                  <div className="max-w-none">
                    <h2 className="md:text-xl text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                      서비스 이용약관
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
                      본 약관은 인싸이더(이하 "회사")가 제공하는 서비스의 이용과
                      관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타
                      필요한 사항을 규정함을 목적으로 합니다.
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-2">
                      1.1 정의
                    </h3>
                    <p className="mb-2">
                      본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                    </p>
                    <ul className="ml-4 pl-4 list-disc text-gray-800 dark:text-gray-200 mb-4">
                      <li>
                        "서비스"란 회사가 제공하는 인싸이더 웹사이트 및 모바일
                        애플리케이션을 통해 이용할 수 있는 모든 서비스를
                        의미합니다.
                      </li>
                      <li>
                        "이용자"란 본 약관에 따라 회사가 제공하는 서비스를
                        이용하는 회원 및 비회원을 말합니다.
                      </li>
                      <li>
                        "회원"이란 회사에 개인정보를 제공하여 회원등록을 한
                        자로서, 회사의 정보를 지속적으로 제공받으며 회사가
                        제공하는 서비스를 계속적으로 이용할 수 있는 자를
                        말합니다.
                      </li>
                      <li>
                        "비회원"이란 회원에 가입하지 않고 회사가 제공하는
                        서비스를 이용하는 자를 말합니다.
                      </li>
                    </ul>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-2">
                      1.2 약관의 효력 및 변경
                    </h3>
                    <p className="mb-4">
                      본 약관은 서비스를 이용하고자 하는 모든 이용자에게
                      적용됩니다. 회사는 필요한 경우 관련법령을 위배하지 않는
                      범위에서 본 약관을 변경할 수 있습니다. 회사가 약관을
                      변경할 경우에는 적용일자 및 변경사유를 명시하여 현행
                      약관과 함께 서비스 내에 그 적용일자 7일 전부터 적용일자
                      전일까지 공지합니다.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="privacy" className="mt-0">
                  <div className="max-w-none">
                    <h2 className="md:text-xl text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                      개인정보처리방침 전문
                    </h2>
                    <div className="mb-8">
                      <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                        인싸이더(이하 "팀")는 이용자의 개인정보를 소중하게
                        생각하며, 관련 법령을 준수하기 위해 최선을 다하고
                        있습니다. 본 서비스는 사이드 프로젝트로 운영되며,
                        개인정보는 서비스 제공 및 운영 목적 외에는 사용하지
                        않습니다.
                        <br />
                        <br />
                        <strong>1. 수집하는 개인정보 항목</strong>
                        <br />
                        인싸이더는 회원가입, 서비스 이용 시 아래와 같은 최소한의
                        개인정보를 수집합니다.
                        <br />
                        - 이메일 주소, 닉네임, 비밀번호(암호화 저장)
                        <br />
                        - 프로필 이미지(선택)
                        <br />
                        - 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보
                        <br />
                        <br />
                        <strong>2. 개인정보의 수집 및 이용목적</strong>
                        <br />
                        수집한 개인정보는 다음의 목적에만 사용됩니다.
                        <br />
                        - 회원 관리 및 본인 확인
                        <br />
                        - 서비스 제공 및 맞춤형 콘텐츠 추천
                        <br />
                        - 불법/부정 이용 방지 및 문의 대응
                        <br />
                        <br />
                        <strong>3. 개인정보의 보유 및 이용기간</strong>
                        <br />
                        인싸이더는 개인정보 수집 및 이용 목적이 달성되면 해당
                        정보를 즉시 파기합니다. 단, 관련 법령에 따라 일정 기간
                        보관이 필요한 경우에는 법령에서 정한 기간 동안만
                        보관합니다.
                        <br />
                        - 로그인 기록: 3개월 (통신비밀보호법 등 관련 법령 준수)
                        <br />
                        <br />
                        <strong>4. 개인정보의 파기 절차 및 방법</strong>
                        <br />
                        개인정보는 목적 달성 후 즉시 안전하게 삭제됩니다. 전자적
                        파일 형태는 복구 불가능한 방법으로, 종이 문서는 분쇄
                        또는 소각하여 파기합니다.
                        <br />
                        <br />
                        <strong>5. 개인정보 제공 및 위탁</strong>
                        <br />
                        인싸이더는 이용자의 동의 없이 개인정보를 외부에
                        제공하거나 위탁하지 않습니다.
                        <br />
                        <br />
                        <strong>6. 이용자의 권리와 행사 방법</strong>
                        <br />
                        이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제
                        요청할 수 있습니다. 문의는 아래 이메일로 연락해 주세요.
                        <br />
                        - 문의 이메일: ironjustlikethat@gmail.com
                        <br />
                        <br />본 방침은 2024년 6월 1일부터 적용됩니다.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="copyright" className="mt-0">
                  <div className="max-w-none">
                    <h2 className="md:text-xl text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                      저작권 정책
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
                      인싸이더(이하 "회사")는 저작권법을 준수하며, 회사가
                      제공하는 서비스를 통해 게시되는 모든 콘텐츠의 저작권
                      보호를 중요시합니다.
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-2">
                      1.1 콘텐츠 저작권
                    </h3>
                    <p className="mb-2">
                      회사가 제작한 콘텐츠에 대한 저작권 및 기타 지적재산권은
                      회사에 귀속됩니다. 이용자는 회사가 제공하는 서비스를
                      이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신,
                      출판, 배포, 방송 등 기타 방법에 의하여 영리목적으로
                      이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-2">
                      1.2 이용자 콘텐츠
                    </h3>
                    <p className="mb-2">
                      이용자가 서비스 내에 게시한 게시물의 저작권은 해당
                      게시물의 저작자에게 귀속됩니다. 이용자가 서비스 내에
                      게시하는 게시물은 검색결과 내지 서비스 및 관련 프로모션
                      등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위
                      내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다.
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-2">
                      1.3 저작권 침해 신고
                    </h3>
                    <p className="mb-2">
                      회사는 저작권법을 준수하고 이용자의 권리를 보호하기 위해
                      저작권 침해에 대한 신고를 접수하고 처리합니다. 저작권
                      침해를 발견한 경우, 다음 정보를 포함하여 회사에 신고해
                      주시기 바랍니다.
                    </p>
                    <ul className="ml-4 pl-4 list-disc text-gray-800 dark:text-gray-200 mb-4">
                      <li>침해된 저작물의 설명 및 소유권 증명</li>
                      <li>침해 콘텐츠의 위치(URL)</li>
                      <li>연락처 정보(이메일, 전화번호)</li>
                      <li>침해 신고의 진실성에 대한 진술</li>
                    </ul>
                    <h2 className="md:text-xl text-lg font-semibold text-gray-900 dark:text-gray-100 mt-12 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                      2. 저작권 침해에 대한 조치
                    </h2>
                    <p className="mb-4">
                      회사는 저작권 침해가 확인된 콘텐츠에 대해 다음과 같은
                      조치를 취할 수 있습니다.
                    </p>
                    <ul className="ml-4 pl-4 list-disc text-gray-800 dark:text-gray-200 mb-4">
                      <li>해당 콘텐츠의 삭제 또는 접근 차단</li>
                      <li>반복적인 침해자에 대한 서비스 이용 제한</li>
                      <li>관련 법적 조치 시행</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                      최종 업데이트: 2023년 12월 1일
                    </p>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
