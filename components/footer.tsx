import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Twitter, Youtube, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                인싸이더
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              인싸 문화, 밈, 인플루언서, 연예인을 중심으로 한 트렌디하고 캐주얼한 웹사이트
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Youtube">
                <Youtube className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">카테고리</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/trending"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  트렌딩
                </Link>
              </li>
              <li>
                <Link
                  href="/memes"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  밈
                </Link>
              </li>
              <li>
                <Link
                  href="/influencers"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  인플루언서
                </Link>
              </li>
              <li>
                <Link
                  href="/celebrities"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  연예인
                </Link>
              </li>
              <li>
                <Link
                  href="/challenges"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  챌린지
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link
                  href="/creator-studio"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  크리에이터 스튜디오
                </Link>
              </li>
              <li>
                <Link
                  href="/live"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  라이브 스트리밍
                </Link>
              </li>
              <li>
                <Link
                  href="/points"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  인싸 포인트
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">뉴스레터 구독</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">최신 트렌드와 인싸 소식을 받아보세요</p>
            <div className="flex">
              <Input
                type="email"
                placeholder="이메일 주소"
                className="rounded-l-lg rounded-r-none border-r-0 focus-visible:ring-purple-500"
              />
              <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2024 인싸이더. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-purple-600 dark:hover:text-purple-400">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-purple-600 dark:hover:text-purple-400">
              개인정보처리방침
            </Link>
            <Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400">
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
