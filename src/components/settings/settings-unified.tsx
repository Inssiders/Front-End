"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { authApi } from "@/utils/fetch/auth";
import { UserType } from "@/utils/types/user";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  Save,
  Shield,
  User,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import styles from "./settings-unified.module.css";

interface SettingsUnifiedProps {
  user: UserType;
}

export default function SettingsUnified({ user }: SettingsUnifiedProps) {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // 프로필 상태
  const [profileData, setProfileData] = useState({
    nickname: user.nickname || "",
    bio: user.bio || "",
    email: user.email || "",
  });

  // 비밀번호 상태
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 개인정보 상태
  const [privacyData, setPrivacyData] = useState({
    accountVisible: user.accountVisible ?? true,
    followerVisible: user.followerVisible ?? true,
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await authApi.updateProfile({
        nickname: profileData.nickname,
        introduction: profileData.bio,
        account_visibility: privacyData.accountVisible,
        follower_visibility: privacyData.followerVisible,
      });

      // next-auth 세션 업데이트
      await update({
        nickname: data.data?.nickname || profileData.nickname,
        bio: data.data?.bio || profileData.bio,
        accountVisible: data.data?.accountVisible ?? privacyData.accountVisible,
        followerVisible: data.data?.followerVisible ?? privacyData.followerVisible,
      });

      toast.success("설정이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("설정 저장 에러:", error);
      toast.error(error instanceof Error ? error.message : "설정 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      setPasswordLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("새 비밀번호는 최소 8자 이상이어야 합니다.");
      setPasswordLoading(false);
      return;
    }

    try {
      await authApi.changePassword(passwordData.newPassword);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("비밀번호 변경 에러:", error);
      toast.error(error instanceof Error ? error.message : "비밀번호 변경에 실패했습니다.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*#?&]/.test(password)) score++;
    return score;
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 2) return "약함";
    if (score <= 3) return "보통";
    if (score <= 4) return "강함";
    return "매우 강함";
  };

  // 비밀번호 변경 버튼 활성화 조건 체크
  const isPasswordFormValid = () => {
    return (
      passwordData.currentPassword.trim() !== "" &&
      passwordData.newPassword.length >= 8 &&
      passwordData.confirmPassword.trim() !== "" &&
      passwordData.newPassword === passwordData.confirmPassword
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      {/* 프로필 정보 섹션 */}
      <Card className={styles.profileCard}>
        <CardHeader className={styles.profileCardHeader}>
          <CardTitle className={styles.profileCardTitle}>
            <User className="mr-2 size-5" />
            프로필 정보
          </CardTitle>
        </CardHeader>
        <CardContent className={styles.profileCardContent}>
          <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
            <div className={styles.profileFormRow}>
              <motion.div
                className={styles.profileImageContainer}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Avatar className={styles.profileImage}>
                  <AvatarImage
                    src={user.profileImage || "/placeholder.svg?height=96&width=96&text=MS"}
                    alt="프로필 이미지"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-xl font-bold text-white">
                    {user.nickname?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button type="button" size="icon" className={styles.profileImageButton}>
                    <Camera className="size-4" />
                  </Button>
                </motion.div>
              </motion.div>

              <div className={styles.profileFormColumn}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="username" className={styles.profileLabel}>
                    <User className="mr-2 size-4 text-purple-600" />
                    닉네임
                  </Label>
                  <Input
                    id="username"
                    value={profileData.nickname}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        nickname: e.target.value,
                      }))
                    }
                    required
                    className={styles.profileInput}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="bio" className={styles.profileLabel}>
                    <Shield className="mr-2 size-4 text-purple-600" />
                    소개
                  </Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    rows={3}
                    className={styles.profileTextarea}
                    placeholder="자신을 소개해보세요..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="email" className={styles.profileLabel}>
                    <Mail className="mr-2 size-4 text-purple-600" />
                    이메일
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className={styles.profileDisabledInput}
                  />
                </motion.div>
              </div>
            </div>

            {/* 개인정보 설정 섹션 - 통합 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.privacySection}
            >
              <h3 className={styles.privacySectionTitle}>
                <Lock className="mr-2 size-5 text-purple-600" />
                개인정보 설정
              </h3>
              <div className={styles.privacyGrid}>
                <motion.div className={styles.privacyItem} whileHover={{ scale: 1.02 }}>
                  <div className={styles.privacyItemContent}>
                    <Label htmlFor="public-profile" className={styles.privacyLabel}>
                      공개 프로필
                    </Label>
                    <p className={styles.privacyDescription}>
                      다른 사용자가 내 프로필을 볼 수 있습니다
                    </p>
                  </div>
                  <Switch
                    id="public-profile"
                    checked={privacyData.accountVisible}
                    onCheckedChange={(checked) =>
                      setPrivacyData((prev) => ({
                        ...prev,
                        accountVisible: checked,
                      }))
                    }
                    className={styles.privacySwitch}
                  />
                </motion.div>

                <motion.div className={styles.privacyItem} whileHover={{ scale: 1.02 }}>
                  <div className={styles.privacyItemContent}>
                    <Label htmlFor="public-followers" className={styles.privacyLabel}>
                      팔로워 공개
                    </Label>
                    <p className={styles.privacyDescription}>
                      다른 사용자가 내 팔로워 목록을 볼 수 있습니다
                    </p>
                  </div>
                  <Switch
                    id="public-followers"
                    checked={privacyData.followerVisible}
                    onCheckedChange={(checked) =>
                      setPrivacyData((prev) => ({
                        ...prev,
                        followerVisible: checked,
                      }))
                    }
                    className={styles.privacySwitch}
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className={styles.submitContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button type="submit" disabled={isLoading} className={styles.submitButton}>
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={styles.loadingTextContainer}
                    >
                      <div className={styles.loadingSpinner} />
                      저장 중...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="save"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={styles.submitTextContainer}
                    >
                      <Save className="mr-2 size-4" />
                      설정 저장
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      {/* 비밀번호 변경 섹션 */}
      <Card className={styles.passwordCard}>
        <CardHeader className={styles.passwordCardHeader}>
          <CardTitle className={styles.passwordCardTitle}>
            <KeyRound className="mr-2 size-5" />
            비밀번호 변경
          </CardTitle>
        </CardHeader>
        <CardContent className={styles.passwordCardContent}>
          <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="current-password" className={styles.passwordLabel}>
                <Lock className="mr-2 size-4 text-red-600" />
                현재 비밀번호
              </Label>
              <div className={styles.passwordInputContainer}>
                <Input
                  id="current-password"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  required
                  className={styles.passwordInput}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={styles.passwordToggleButton}
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                >
                  {showPasswords.current ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="new-password" className={styles.passwordLabel}>
                <KeyRound className="mr-2 size-4 text-red-600" />새 비밀번호
              </Label>
              <div className={styles.passwordInputContainer}>
                <Input
                  id="new-password"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  required
                  minLength={8}
                  className={styles.passwordInput}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={styles.passwordToggleButton}
                  onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              {passwordData.newPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={styles.passwordStrengthContainer}
                >
                  <div className={styles.passwordStrengthBar}>
                    <div
                      className={`${styles.passwordStrengthFill} ${getPasswordStrengthColor(
                        passwordStrength(passwordData.newPassword)
                      )}`}
                      style={{
                        width: `${(passwordStrength(passwordData.newPassword) / 5) * 100}%`,
                      }}
                    />
                  </div>
                  <span className={styles.passwordStrengthText}>
                    {getPasswordStrengthText(passwordStrength(passwordData.newPassword))}
                  </span>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="confirm-password" className={styles.passwordLabel}>
                <Shield className="mr-2 size-4 text-red-600" />새 비밀번호 확인
              </Label>
              <div className={styles.passwordInputContainer}>
                <Input
                  id="confirm-password"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  required
                  className={`${styles.passwordInput} ${
                    passwordData.confirmPassword
                      ? passwordData.newPassword === passwordData.confirmPassword
                        ? styles.passwordInputValid
                        : styles.passwordInputInvalid
                      : styles.passwordInputDefault
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={styles.passwordToggleButton}
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
                {passwordData.confirmPassword && (
                  <div className={styles.passwordCheckIcon}>
                    {passwordData.newPassword === passwordData.confirmPassword ? (
                      <Check className="size-4 text-green-500" />
                    ) : (
                      <X className="size-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {passwordData.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={styles.passwordCheckText}
                >
                  <p
                    className={`${
                      passwordData.newPassword === passwordData.confirmPassword
                        ? styles.passwordCheckTextValid
                        : styles.passwordCheckTextInvalid
                    }`}
                  >
                    {passwordData.newPassword === passwordData.confirmPassword ? (
                      <>
                        <Check className="mr-1 size-3" />
                        비밀번호가 일치합니다
                      </>
                    ) : (
                      <>
                        <X className="mr-1 size-3" />
                        비밀번호가 일치하지 않습니다
                      </>
                    )}
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className={styles.passwordSubmitContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className={styles.passwordSubmitColumn}>
                {!isPasswordFormValid() && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.passwordSubmitText}
                  >
                    {passwordData.newPassword.length < 8
                      ? "새 비밀번호는 최소 8자 이상이어야 합니다"
                      : passwordData.newPassword !== passwordData.confirmPassword
                        ? "비밀번호 확인이 일치하지 않습니다"
                        : "모든 필드를 입력해주세요"}
                  </motion.p>
                )}
                <Button
                  type="submit"
                  disabled={passwordLoading || !isPasswordFormValid()}
                  variant="outline"
                  className={`${styles.passwordSubmitButton} ${
                    isPasswordFormValid() && !passwordLoading
                      ? styles.passwordSubmitButtonValid
                      : styles.passwordSubmitButtonDisabled
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {passwordLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.passwordSubmitTextContainer}
                      >
                        <div className={styles.passwordSubmitSpinner} />
                        변경 중...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="change"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.passwordSubmitTextContainer}
                      >
                        <KeyRound className="mr-2 size-4" />
                        비밀번호 변경
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
