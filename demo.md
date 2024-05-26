the commands used

sudo apt install ffmpeg

// gpu
ffmpeg -i videos/test1.mp4 -c:v h264_nvenc -c:a aac -f hls -hls_time 10  -hls_list_size 0 videos/output.m3u8 

// cpu
ffmpeg -i videos/test1.mp4 -c:v libx264 -c:a aac -f hls -hls_time 3  -hls_list_size 0 output.m3u8