#version 330

// 3x3 �ړ����σt�B���^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// ���ς����߂�
void main(void)
{
  vec4 sum = texture(image, gl_FragCoord.xy);

  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1));

  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0));

  sum += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1));
  sum += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1));

  fc = sum * 0.11111111;
}
