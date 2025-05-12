"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useDataSource } from "@/contexts/data-source-context";
import { RefreshCw, ServerOff, WifiOff } from "lucide-react";

export function DataSourceIndicator() {
  const { dataSource, isOffline, isApiDown, checkConnectivity } =
    useDataSource();

  if (dataSource === "loading") {
    return null;
  }

  if (isOffline) {
    return (
      <Alert variant="destructive" className="mb-4">
        <WifiOff className="h-4 w-4 mr-2" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            오프라인 모드: 인터넷 연결이 없습니다. 로컬 데이터를 사용합니다.
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={checkConnectivity}
            className="ml-2"
          >
            <RefreshCw className="h-4 w-4 mr-1" /> 재시도
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (isApiDown) {
    return (
      <Alert variant="default" className="mb-4">
        <ServerOff className="h-4 w-4 mr-2" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            서버 연결 실패: API 서버에 연결할 수 없습니다. 로컬 데이터를
            사용합니다.
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={checkConnectivity}
            className="ml-2"
          >
            <RefreshCw className="h-4 w-4 mr-1" /> 재시도
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
